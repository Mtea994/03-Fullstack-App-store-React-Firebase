import React, { useState } from "react";
import InputContainer from "../../components/admin/InputContainer";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function NewAppForm() {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    appIcon: "",
    reviews: "",
    totalReviews: "",
    downloads: "",
    cover: "",
    banners: [],
    shortDescription: "", // textarea
  });

  const storage = getStorage();

  async function uploadFile(file, path) {
    const fileRef = ref(storage, `images/${path}/${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  }

  async function inputHandler(event, identifier, index) {
    console.log(event, "EVENT");
    if (identifier === "banners") {
      // const filesArray = Array.from(event.target.files).map((file, i) => ({
      //   id: index + i, // or use another unique id strategy
      //   uri: URL.createObjectURL(file), // or simply `file` if you want to store the File object
      // }));
      const filesArray = await Promise.all(
        Array.from(event.target.files).map(async (file, i) => {
          const fileUrl = await uploadFile(file, "banners");
          return { id: index + i, uri: fileUrl };
        })
      );

      setFormData((previousData) => ({
        ...previousData,
        banners: [...previousData.banners, ...filesArray],
      }));
    } else if (identifier === "cover" || identifier === "appIcon") {
      // Assuming these are single file inputs.
      const file = event.target.files[0];
      // if (file) {
      //   const fileUrl = URL.createObjectURL(file);
      //   setFormData((previousData) => ({
      //     ...previousData,
      //     [identifier]: fileUrl,
      //   }));
      // }
      if (file) {
        const fileUrl = await uploadFile(file, identifier);
        setFormData((previousData) => ({
          ...previousData,
          [identifier]: fileUrl,
        }));
      }
    } else {
      const value = event.target.value;
      setFormData((previousData) => ({ ...previousData, [identifier]: value }));
    }
  }

  console.log(formData, "Data");

  return (
    <form className="w-full flex flex-col gap-2">
      {Object.keys(formData).map((el, index) => {
        if (el !== "shortDescription") {
          const fileTypes = ["cover", "banners", "appIcon"];
          // const inputType = fileTypes.includes(el) ? "file" : "text";

          return (
            <div>
              <label>{el}</label>
              <InputContainer
                placeholder={`${el}`}
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
              {fileTypes.includes(el) && formData[el].length > 0 && (
                <div className="flex gap-1 py-2 px-2">
                  {el === "banners" && formData.banners.length > 0 ? (
                    formData.banners.map((el) => (
                      <div className=" w-16 h-auto">
                        <img src={el?.uri} />
                      </div>
                    ))
                  ) : (
                    <div className=" w-16 h-auto">
                      <img src={formData[el]} />
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
