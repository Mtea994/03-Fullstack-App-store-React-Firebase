import React, { useState } from "react";
import InputContainer from "../../components/admin/InputContainer";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { saveAppDataToCloud } from "../../api";
import { toast } from "react-toastify";
import { serverTimestamp } from "firebase/firestore";
import useApps from "../../hooks/apps/useApps";
import { PuffLoader } from "react-spinners";

function NewAppForm() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    appIcon: null,
    reviews: "",
    totalReviews: "",
    downloads: "",
    cover: null,
    banners: [],
    shortDescription: "", // textarea
  });

  const [loader, setLoader] = useState(false);
  const { refetch } = useApps();

  const storage = getStorage();

  async function inputHandler(event, identifier) {
    if (identifier === "banners") {
      const filesArray = Array.from(event.target.files).map((file) => ({
        id: crypto.randomUUID(), // or use another unique id strategy
        file: file, // or simply `file` if you want to store the File object
      }));
      // const filesArray = await Promise.all(
      //   Array.from(event.target.files).map(async (file, i) => {
      //     const fileUrl = await uploadFile(file, "banners");
      //     return { id: index + i, uri: fileUrl };
      //   })
      // );

      setFormData((previousData) => ({
        ...previousData,
        banners: [...previousData.banners, ...filesArray],
      }));
    } else if (identifier === "cover" || identifier === "appIcon") {
      // Assuming these are single file inputs.
      const file = event.target.files[0];
      if (file) {
        setFormData((previousData) => ({
          ...previousData,
          [identifier]: { file: file },
        }));
      }
      // if (file) {
      //   const fileUrl = await uploadFile(file, identifier);
      //   setFormData((previousData) => ({
      //     ...previousData,
      //     [identifier]: fileUrl,
      //   }));
      // }
    } else {
      const value = event.target.value;
      setFormData((previousData) => ({ ...previousData, [identifier]: value }));
    }
  }

  async function uploadFile(file, path) {
    const fileRef = ref(storage, `images/${path}/${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  // console.log(loader, "Loader");

  if (loader) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="font-medium capitalize">
          Uploading Pictures and Submitting Data..
        </p>
        <PuffLoader size={60} color="#ff9e01" />
      </div>
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoader(true);

    // Upload images only when form is submitted
    const uploadedImages = {};

    if (formData.cover?.file) {
      uploadedImages.cover = await uploadFile(formData.cover.file, "cover");
    }
    if (formData.appIcon?.file) {
      uploadedImages.appIcon = await uploadFile(
        formData.appIcon.file,
        "appIcon"
      );
    }
    if (formData.banners.length > 0) {
      const uploadedBanners = await Promise.all(
        formData.banners.map(async (banner) => ({
          id: banner.id,
          uri: await uploadFile(banner.file, "banners"),
        }))
      );
      uploadedImages.banners = uploadedBanners;
    }

    // Update formData with Firebase URLs
    // setFormData((prev) => ({
    //   ...prev,
    //   ...uploadedImages,
    // }));

    const id = `${Date.now()}`;
    const timeStamp = serverTimestamp();

    await saveAppDataToCloud({
      _id: id,
      ...formData,
      ...uploadedImages,
      timeStamp,
    });
    setLoader(false);
    await refetch();
    toast.success("Data Saved in the Cloud");

    console.log("Final form data:", { ...formData, ...uploadedImages });
    setFormData({
      title: "",
      company: "",
      appIcon: null,
      reviews: "",
      totalReviews: "",
      downloads: "",
      cover: null,
      banners: [],
      shortDescription: "", // textarea
    });
    alert("Form submitted successfully!");
  }

  // console.log(formData, "Data");

  return (
    <form className="w-full flex flex-col gap-2" onSubmit={handleSubmit}>
      {Object.keys(formData).map((el, index) => {
        if (el !== "shortDescription") {
          const fileTypes = ["cover", "banners", "appIcon"];
          // const inputType = fileTypes.includes(el) ? "file" : "text";

          return (
            <div>
              <label>{el}</label>
              <InputContainer
                placeholder={el}
                key={index}
                // type={inputType}
                type={fileTypes.includes(el) ? "file" : "text"}
                accept={
                  fileTypes.includes(el)
                    ? "image/png, image/gif, image/jpeg"
                    : undefined
                }
                multiple={el === "banners"}
                onChange={(event) => inputHandler(event, el, index)}
                value={fileTypes.includes(el) ? undefined : formData[el]}
              />
              {fileTypes.includes(el) && formData[el] && (
                <div className="flex gap-1 py-2 px-2">
                  {el === "banners"
                    ? formData.banners.map((el) => (
                        <div className=" w-16 h-auto">
                          <img src={el?.file} />
                        </div>
                      ))
                    : formData[el]?.file && (
                        <div className="w-16 h-auto">
                          <img
                            src={URL.createObjectURL(formData[el].file)}
                            alt={el}
                          />
                        </div>
                      )}
                </div>
              )}
            </div>
          );
        } else {
          return (
            <textarea
              cols={0}
              rows={10}
              placeholder="enter description"
              className="w-full bg-textPrimary rounded-md border outline-none shadow-sm border-third 
      text-lg font-semibold font-sans text-secondary px-2"
              onChange={(event) => inputHandler(event, el)}
              value={formData[el]}
            />
          );
        }
      })}
      {/* Buttons */}
      <div className="w-full flex items-center justify-end px-4 py-3 gap-4 ">
        <button
          type="submit"
          className="px-8 py-2 bg-secondary rounded-md shadow-sm cursor-pointer text-lg font-bold text-textSecondary hover:bg-heroPrimary"
        >
          Add
        </button>
        <button
          type="reset"
          className="px-8 py-2 bg-secondary rounded-md shadow-sm cursor-pointer text-lg font-bold text-textSecondary hover:bg-heroPrimary"
          onClick={() =>
            setFormData({
              title: "",
              company: "",
              appIcon: null,
              reviews: "",
              totalReviews: "",
              downloads: "",
              cover: null,
              banners: [],
              shortDescription: "",
            })
          }
        >
          Clear
        </button>
      </div>
      {/* submit */}
      {/* reset */}
    </form>
  );
}

const NewApp = () => {
  return (
    <div
      className="w-full flex flex-col items-center justify-start px-6 py-4 
    "
    >
      <NewAppForm />
      {/* <InputContainer /> */}
    </div>
  );
};

export default NewApp;
