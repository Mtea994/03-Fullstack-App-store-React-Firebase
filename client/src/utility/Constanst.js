import {
  FaBehance,
  FaBolt,
  FaFacebook,
  FaLinkedin,
  FaListCheck,
} from "react-icons/fa6";

import { FaUserAlt, FaListAlt } from "react-icons/fa";

import { MdSportsBaseball } from "react-icons/md";
import {
  GiTrophy,
  GiTransportationRings,
  GiCardAceClubs,
} from "react-icons/gi";
import { TbTopologyStarRing3 } from "react-icons/tb";
import { BiLogoDiscordAlt, BiSolidJoystick } from "react-icons/bi";
import { RiCustomerService2Fill } from "react-icons/ri";

export const Menus = [
  { id: 1001, menu: "My Profile", uri: "admin/profile" },
  { id: 1002, menu: "My Favourites", uri: "admin/favourites" },
  { id: 1003, menu: "Dashboard", uri: "admin/dashboard", isAdmin: true },
  { id: 1004, menu: "Users", uri: "admin/users", isAdmin: true },
  { id: 1005, menu: "App's", uri: "admin/apps", isAdmin: true },
];

export const ClientMenus = [
  {
    title: "Sports",
    submenu: true,
    Icon: MdSportsBaseball,
    subMenuItems: [
      { title: "Free Match", Icon: GiTransportationRings },
      { title: "Live Sports", Icon: GiTrophy },
    ],
  },
  {
    title: "Casino",
    Icon: GiCardAceClubs,
    spacing: true,
  },
  {
    title: "Slot Ganes",
    Icon: TbTopologyStarRing3,
  },
  {
    title: "Virtual Games",
    Icon: BiSolidJoystick,
  },
  {
    title: "MiniGames",
    Icon: FaBolt,
  },
  {
    title: "Betting History",
    Icon: FaListAlt,
  },
  {
    title: "Community",
    submenu: true,
    Icon: FaUserAlt,
    spacing: true,
    subMenuItems: [
      { title: "Discord", Icon: BiLogoDiscordAlt },
      { title: "LinkedIn", Icon: FaLinkedin },
      { title: "Facebook", Icon: FaFacebook },
      { title: "Behance", Icon: FaBehance },
    ],
  },
  {
    title: "Events List",
    Icon: FaListCheck,
  },
  { title: "Customer Services", Icon: RiCustomerService2Fill },
];
