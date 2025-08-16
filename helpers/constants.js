import dotenv from 'dotenv';
dotenv.config();

export const BASEURL = process.env.BASE_URL + "v3/";

export const ADMINPANELROOT = BASEURL + 'admin';

export const guestUserEmail = "guest@onestop.swc.iitg.ac.in";
export const guestUserName = "Guest";
export const guestUserRollNo = '2110000000';

export const adminRoles = ["super", "board", "mmc", "hmc", "club"];

export const allIITGHostelsGC = ["Brahmaputra", "Kameng", "Gaurang", "Dihing", "Barak", "Kapili", "Lohit", "Manas", "Married Scholars (Men)", "Married Scholars (Women)", "Siang", "Subansiri", "Umiam", "Dhansiri", "Disang (Men)", "Disang (Women)"];
//exports.allIITGHostels = ["Brahmaputra","Kameng","Dihing","Barak","Kapili","Lohit","Manas","Married Scholars","Siang","Subansiri","Umiam","Dhansiri","Disang"];
export const allIITGWomenHostels = ["Married Scholars (Women)", "Subansiri", "Dhansiri", "Disang (Women)"];
export const allIITGTechClubs = ["Coding Club", "CnA Club", "E-Cell", "Robotics Club", "Aeromodelling Club", "Automobile Club", "Electronics Club", "IITG.AI", "Gamedev and ESports", "Equinox", "FEC", "Whitespace", "Acumen", "4i Labs"];
export const allIITGWelfareClubs = ["Academic Initiatives Club", "Rights and Responsibilities Club", "Red Ribbon Club", "Youth Empowerment Club", "Saathi", "Social Service Club", "Substance Abuse Awareness Club"];
export const allIITGHostels = ["LOHIT", "BRAHMAPUTRA", "DISANG", "KAMENG", "BARAK", "MANAS", "DIHING", "UMIAM", "SIANG", "KAPILI", "DHANSIRI", "SUBANSIRI", "MSH", "GAURANG", "DIBANG", "NON-HOSTELLER"];
export const allIITGMess = ["LOHIT", "BRAHMAPUTRA", "DISANG", "KAMENG", "BARAK", "MANAS", "DIHING", "UMIAM", "SIANG", "KAPILI", "DHANSIRI", "SUBANSIRI", "GAURANG", "DIBANG", "NONE"];
export const allIITGGymkhanaBoards = {
    "Sports Board": "sportsec@iitg.ac.in",
    "Students Web Committee (SWC)": "swc@iitg.ac.in",
    "Students Academic Board (SAB)": "sab@iitg.ac.in",
    "Technical Board": "techsec@iitg.ac.in",
    "Cultural Board": "cultsec@iitg.ac.in",
    "Welfare Board": "gensec_welfare@iitg.ac.in",
    "Student Alumni Interaction Linkage (SAIL)": "sail@iitg.ac.in",
    "Vice President, Students Gymkhana": "vp@iitg.ac.in"
};

export const IITGAdminDepts = {
    "Maintainence": "Grp_sgc_maintenance@iitg.ac.in",
    "Services": "Grp_sgc_eug@iitg.ac.in",
    "Finance": "Grp_sgc_finance@iitg.ac.in",
    "Academic": "Grp_sgc_academic@iitg.ac.in",
    "Rights and Responsiblities": "Grp_sgc_rnr@iitg.ac.in",
    "RTI (Right to Information)": "Grp_sgc_steering@iitg.ac.in",
    "Medical Related Issues": "Grp_sgc_mug@iitg.ac.in"
};

export const IITGHostelSSs = {
    "BARAK" : "ss.barak@iitg.ac.in",
    "BRAHMAPUTRA" : "ss.brahmaputra@iitg.ac.in",
    "DHANSIRI" : "ss.dhansiri@iitg.ac.in",
    "DIHING" : "ss.dihing@iitg.ac.in",
    "DISANG" : "ss.disangB@iitg.ac.in",
    "GAURANG" : "ss.gaurang@iitg.ac.in",
    "KAMENG" : "ss.kameng@iitg.ac.in",
    "KAPILI" : "ss.kapili@iitg.ac.in",
    "LOHIT" : "ss.lohit@iitg.ac.in",
    "MANAS" : "ss.manas@iitg.ac.in",
    "SIANG" : "ss.siang@iitg.ac.in",
    "SUBANSIRI" : "ss.subansiri@iitg.ac.in",
    "UMIAM" : "ss.umiam@iitg.ac.in",

    // "Disang Women" : "ss.disangG@iitg.ac.in"
};

export const IITGHostelGSs = {
    "BARAK" : "gs.barak@iitg.ac.in",
    "BRAHMAPUTRA" : "gs.brahmaputra@iitg.ac.in",
    "DHANSIRI" : "gs.dhansiri@iitg.ac.in",
    "DIHING" : "gs.dihing@iitg.ac.in",
    "DISANG" : "gs.disang@iitg.ac.in",
    "GAURANG" : "gs.gaurang@iitg.ac.in",
    "KAMENG" : "gs.kameng@iitg.ac.in",
    "KAPILI" : "gs.kapili@iitg.ac.in",
    "LOHIT" : "gs.lohit@iitg.ac.in",
    "MANAS" : "gs.manas@iitg.ac.in",
    "SIANG" : "gs.siang@iitg.ac.in",
    "SUBANSIRI" : "gs.subansiri@iitg.ac.in",
    "UMIAM" : "gs.umiam@iitg.ac.in",

    // "Disang Women" : "gs_disang.gw@iitg.ac.in"
};

export const IITGHostelWardens = {
    "BARAK" : "warden.barak@iitg.ac.in",
    "BRAHMAPUTRA" : "warden.brahmaputra@iitg.ac.in",
    "DHANSIRI" : "warden.dhansiri@iitg.ac.in",
    "DIHING" : "warden.dihing@iitg.ac.in",
    "DISANG" : "warden.disang@iitg.ac.in",
    "GAURANG" : "warden.gaurang@iitg.ac.in",
    "KAMENG" : "warden.kameng@iitg.ac.in",
    "KAPILI" : "warden.kapili@iitg.ac.in",
    "LOHIT" : "warden.lohit@iitg.ac.in",
    "MANAS" : "warden.manas@iitg.ac.in",
    "SIANG" : "warden.siang@iitg.ac.in",
    "SUBANSIRI" : "warden.subansiri@iitg.ac.in",
    "UMIAM" : "warden.umiam@iitg.ac.in",

    // "Disang Women" : "warden.disang_gw@iitg.ac.in"
};

export const IITGHostelOffices = {
    "BARAK" : "barak_off@iitg.ac.in",
    "BRAHMAPUTRA" : "brahmaputra_off@iitg.ac.in",
    "DHANSIRI" : "dhansiri_off@iitg.ac.in",
    "DIHING" : "dihing_off@iitg.ac.in",
    "DISANG" : "disangoff@iitg.ac.in",
    "GAURANG" : "gaurang_off@iitg.ac.in",
    "KAMENG" : "kameng_off@iitg.ac.in",
    "KAPILI" : "kapili_off@iitg.ac.in",
    "LOHIT" : "lohit_off@iitg.ac.in",
    "MANAS" : "manas_off@iitg.ac.in",
    "SIANG" : "siang_off@iitg.ac.in",
    "SUBANSIRI" : "subansiri_off@iitg.ac.in",
    "UMIAM" : "umiam_off@iitg.ac.in",

    // "Disang Women" : "disang.gw_off@iitg.ac.in"
};

export const IITGHostelMSs = {
    "BARAK" : "ms.barak@iitg.ac.in",
    "BRAHMAPUTRA" : "ms.brahmaputra@iitg.ac.in",
    "DHANSIRI" : "ms.dhansiri@iitg.ac.in",
    "DIHING" : "ms.dihing@iitg.ac.in",
    "DISANG" : "ms.disangB@iitg.ac.in",
    "GAURANG" : "ms.gaurang@iitg.ac.in",
    "KAMENG" : "ms.kameng@iitg.ac.in",
    "KAPILI" : "ms.kapili@iitg.ac.in",
    "LOHIT" : "ms.lohit@iitg.ac.in",
    "MANAS" : "ms.manas@iitg.ac.in",
    "SIANG" : "ms.siang@iitg.ac.in",
    "SUBANSIRI" : "ms.subansiri@iitg.ac.in",
    "UMIAM" : "ms.umiam@iitg.ac.in",

    // "Disang Women" : "ms.disangG@iitg.ac.in"
};

export const miscellaneousRecievers = [];

export const totalSpardhaWomenPoints = 190;
export const totalSpardhaMenPoints = 230;
export const totalKritiPoints = 9350;
export const totalSahyogPoints = 2850;
export const totalManthanPoints = 1290;

export const NotificationCategories = {
    lost: "lost",
    found: "found",
    buy: "buy",
    sell: "sell",
    cabSharing: "cabSharing",
    announcement: "announcement"
};

export const defaultNotifCategoriesMap = {
    "lost": true,
    "found": true,
    "buy": true,
    "sell": true,
    "cabSharing": true,
    "announcement": true
};

export const sendToAllFirebaseTopicName = "all";
