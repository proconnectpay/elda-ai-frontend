import Settings from "../assets/settings.svg";
import Documents from "../assets/documents.svg";
import SolarDocuments from "../assets/solar_documents.svg";
import chart from "../assets/chart.svg";
import settingsRed from "../assets/settings-red.svg";
import DocumentsRed from "../assets/documents-red.svg";
import SolarDocumentsRed from "../assets/solar-red.svg";
import chartRed from "../assets/chart-red.svg";
import icon1 from "../assets/Icon1.svg";
import icon2 from "../assets/Icon2.svg";
import icon3 from "../assets/Icon3.svg";
import SocialIcons1 from "../assets/Social icons1.png";
import SocialIcons3 from "../assets/Social icons3.png";
import SocialIcons4 from "../assets/Social icons4.png";
import SocialIcons5 from "../assets/Social icons5.png";
import SocialIcons6 from "../assets/youtube.png";
import humanIcon from "../assets/candidate-icon.png";
import messageIcon from "../assets/message-icon.png";
import editIcon from "../assets/edit-icon.png";
import settingsIcon from "../assets/settings-icon.png";
import fileIcon from "../assets/files-icon.png";
import shieldIcon from "../assets/shield-icon.png";
import metricsIcon from "../assets/metrics-icon.png";
import { OptionType } from "@/types";

export const sidebarLinks = [
  {
    imgURL: chart,
    route: "/assigned-candidates",
    label: "Assigned Candidates",
    isActive: chartRed,
  },
  {
    imgURL: SolarDocuments,
    route: "/refine-resume",
    label: "Refine Resume",
    isActive: SolarDocumentsRed,
  },
  {
    imgURL: Documents,
    route: "/craft-sop",
    label: "Craft SOPs",
    isActive: DocumentsRed,
  },
  {
    imgURL: Settings,
    route: "/profile",
    label: "Profile",
    isActive: settingsRed,
  },
];

export const smallBox = [
  {
    icon: icon1,
    number: 10,
    name: "Number Of Assigned Candidates",
  },
  {
    icon: icon2,
    number: 2,
    name: "Number Of Jobs Completed",
  },
  {
    icon: icon3,
    number: 8,
    name: "Number Of Jobs Unfinished",
  },
];

export const businessLinks = [
  {
    url: "https://proconnectpay.com/pricing",
    name: "Service Fee Pricing",
  },
  {
    url: "https://proconnectpay.com/supported-schools",
    name: "List of Supported Schools",
  },
  {
    url: "https://proconnectpay.com/interest",
    name: "Signify your interest",
  },
  {
    url: "https://proconnectpay.com/local-loan",
    name: "Local loan",
  },
  {
    url: "https://proconnectpay.com/global-loan",
    name: "Global Loan",
  },
  {
    url: "https://proconnectpay.com/privacy-policy",
    name: "Privacy Policy",
  },
  {
    url: "https://proconnectpay.com/global-loan#terms-conditions",
    name: "Terms and Conditions",
  },
];

export const locationLinks = [
  {
    url: "https://proconnectpay.com/contact",
    name: "Global HQ US",
  },
  {
    url: "https://proconnectpay.com/contact",
    name: "Africa HQ Lagos",
  },
  {
    url: "https://proconnectpay.com/contact",
    name: "Accra Office",
  },
  {
    url: "https://proconnectpay.com/contact",
    name: "Kampala Office",
  },
  {
    url: "https://proconnectpay.com/contact",
    name: "Nairobi Office",
  },
  {
    url: "https://proconnectpay.com/contact",
    name: "Kigali Office",
  },
  {
    url: "https://proconnectpay.com/contact",
    name: "Toronto Office",
  },
];

export const socialIcons = [
  { name: SocialIcons1, url: "https://web.facebook.com/proconnectpay" },
  { name: SocialIcons3, url: "https://twitter.com/ProconnectPAY" },
  { name: SocialIcons4, url: "https://www.instagram.com/proconnectpay/" },
  { name: SocialIcons5, url: "https://ng.linkedin.com/company/proconnectpay" },
  {
    name: SocialIcons6,
    url: "https://www.youtube.com/channel/UCsX-weJpSWORcMUAQ-g0HdA",
  },
];

export const NotificationDetails = [
  {
    icon: humanIcon,
    date: "June 12, 2023",
    title: "New Candidate Added:",
    text: "Mary Johnson, was added by Admin",
  },
  {
    icon: messageIcon,
    date: "June 12, 2023",
    title: "New Staff Invited:",
    text: "An invitation was sent to Sarah Connor to join the team",
  },
  {
    icon: editIcon,
    date: "June 12, 2023",
    title: "John Doe's Resume Updated:",
    text: "John Doe's resume was refined by Jane Smith",
  },
  {
    icon: settingsIcon,
    date: "June 12, 2023",
    title: "Staff Profile Updated:",
    text: "Laura Wilson updated her profile information",
  },
  {
    icon: fileIcon,
    date: "June 12, 2023",
    title: "Emily Davis has been Assigned:",
    text: "Emily Davis was assigned to Robert Brown",
  },
  {
    icon: shieldIcon,
    date: "June 12, 2023",
    title: "User Permissions Adjusted:",
    text: "Permissions for the Editor role were adjusted",
  },
  {
    icon: metricsIcon,
    date: "June 12, 2023",
    title: "Performance Metrics Updated:",
    text: " Performance metrics for all staff were updated",
  },
];

export const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

export const countryOptions = [
  { value: "Afghanistan", label: "Afghanistan" },
  { value: "Albania", label: "Albania" },
  { value: "Algeria", label: "Algeria" },
  { value: "Andorra", label: "Andorra" },
  { value: "Angola", label: "Angola" },
  { value: "Antigua and Barbuda", label: "Antigua and Barbuda" },
  { value: "Argentina", label: "Argentina" },
  { value: "Armenia", label: "Armenia" },
  { value: "Australia", label: "Australia" },
  { value: "Austria", label: "Austria" },
  { value: "Azerbaijan", label: "Azerbaijan" },
  { value: "Bahamas", label: "Bahamas" },
  { value: "Bahrain", label: "Bahrain" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Barbados", label: "Barbados" },
  { value: "Belarus", label: "Belarus" },
  { value: "Belgium", label: "Belgium" },
  { value: "Belize", label: "Belize" },
  { value: "Benin", label: "Benin" },
  { value: "Bhutan", label: "Bhutan" },
  { value: "Bolivia", label: "Bolivia" },
  { value: "Bosnia and Herzegovina", label: "Bosnia and Herzegovina" },
  { value: "Botswana", label: "Botswana" },
  { value: "Brazil", label: "Brazil" },
  { value: "Brunei", label: "Brunei" },
  { value: "Bulgaria", label: "Bulgaria" },
  { value: "Burkina Faso", label: "Burkina Faso" },
  { value: "Burundi", label: "Burundi" },
  { value: "Cabo Verde", label: "Cabo Verde" },
  { value: "Cambodia", label: "Cambodia" },
  { value: "Cameroon", label: "Cameroon" },
  { value: "Canada", label: "Canada" },
  { value: "Central African Republic", label: "Central African Republic" },
  { value: "Chad", label: "Chad" },
  { value: "Chile", label: "Chile" },
  { value: "China", label: "China" },
  { value: "Colombia", label: "Colombia" },
  { value: "Comoros", label: "Comoros" },
  {
    value: "Congo, Democratic Republic of the",
    label: "Congo, Democratic Republic of the",
  },
  { value: "Congo, Republic of the", label: "Congo, Republic of the" },
  { value: "Costa Rica", label: "Costa Rica" },
  { value: "Croatia", label: "Croatia" },
  { value: "Cuba", label: "Cuba" },
  { value: "Cyprus", label: "Cyprus" },
  { value: "Czech Republic", label: "Czech Republic" },
  { value: "Denmark", label: "Denmark" },
  { value: "Djibouti", label: "Djibouti" },
  { value: "Dominica", label: "Dominica" },
  { value: "Dominican Republic", label: "Dominican Republic" },
  { value: "Ecuador", label: "Ecuador" },
  { value: "Egypt", label: "Egypt" },
  { value: "El Salvador", label: "El Salvador" },
  { value: "Equatorial Guinea", label: "Equatorial Guinea" },
  { value: "Eritrea", label: "Eritrea" },
  { value: "Estonia", label: "Estonia" },
  { value: "Eswatini", label: "Eswatini" },
  { value: "Ethiopia", label: "Ethiopia" },
  { value: "Fiji", label: "Fiji" },
  { value: "Finland", label: "Finland" },
  { value: "France", label: "France" },
  { value: "Gabon", label: "Gabon" },
  { value: "Gambia", label: "Gambia" },
  { value: "Georgia", label: "Georgia" },
  { value: "Germany", label: "Germany" },
  { value: "Ghana", label: "Ghana" },
  { value: "Greece", label: "Greece" },
  { value: "Grenada", label: "Grenada" },
  { value: "Guatemala", label: "Guatemala" },
  { value: "Guinea", label: "Guinea" },
  { value: "Guinea-Bissau", label: "Guinea-Bissau" },
  { value: "Guyana", label: "Guyana" },
  { value: "Haiti", label: "Haiti" },
  { value: "Honduras", label: "Honduras" },
  { value: "Hungary", label: "Hungary" },
  { value: "Iceland", label: "Iceland" },
  { value: "India", label: "India" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Iran", label: "Iran" },
  { value: "Iraq", label: "Iraq" },
  { value: "Ireland", label: "Ireland" },
  { value: "Israel", label: "Israel" },
  { value: "Italy", label: "Italy" },
  { value: "Jamaica", label: "Jamaica" },
  { value: "Japan", label: "Japan" },
  { value: "Jordan", label: "Jordan" },
  { value: "Kazakhstan", label: "Kazakhstan" },
  { value: "Kenya", label: "Kenya" },
  { value: "Kiribati", label: "Kiribati" },
  { value: "Korea, North", label: "Korea, North" },
  { value: "Korea, South", label: "Korea, South" },
  { value: "Kosovo", label: "Kosovo" },
  { value: "Kuwait", label: "Kuwait" },
  { value: "Kyrgyzstan", label: "Kyrgyzstan" },
  { value: "Laos", label: "Laos" },
  { value: "Latvia", label: "Latvia" },
  { value: "Lebanon", label: "Lebanon" },
  { value: "Lesotho", label: "Lesotho" },
  { value: "Liberia", label: "Liberia" },
  { value: "Libya", label: "Libya" },
  { value: "Liechtenstein", label: "Liechtenstein" },
  { value: "Lithuania", label: "Lithuania" },
  { value: "Luxembourg", label: "Luxembourg" },
  { value: "Madagascar", label: "Madagascar" },
  { value: "Malawi", label: "Malawi" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Maldives", label: "Maldives" },
  { value: "Mali", label: "Mali" },
  { value: "Malta", label: "Malta" },
  { value: "Marshall Islands", label: "Marshall Islands" },
  { value: "Mauritania", label: "Mauritania" },
  { value: "Mauritius", label: "Mauritius" },
  { value: "Mexico", label: "Mexico" },
  { value: "Micronesia", label: "Micronesia" },
  { value: "Moldova", label: "Moldova" },
  { value: "Monaco", label: "Monaco" },
  { value: "Mongolia", label: "Mongolia" },
  { value: "Montenegro", label: "Montenegro" },
  { value: "Morocco", label: "Morocco" },
  { value: "Mozambique", label: "Mozambique" },
  { value: "Myanmar (Burma)", label: "Myanmar (Burma)" },
  { value: "Namibia", label: "Namibia" },
  { value: "Nauru", label: "Nauru" },
  { value: "Nepal", label: "Nepal" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "New Zealand", label: "New Zealand" },
  { value: "Nicaragua", label: "Nicaragua" },
  { value: "Niger", label: "Niger" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "North Macedonia", label: "North Macedonia" },
  { value: "Norway", label: "Norway" },
  { value: "Oman", label: "Oman" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Palau", label: "Palau" },
  { value: "Palestine", label: "Palestine" },
  { value: "Panama", label: "Panama" },
  { value: "Papua New Guinea", label: "Papua New Guinea" },
  { value: "Paraguay", label: "Paraguay" },
  { value: "Peru", label: "Peru" },
  { value: "Philippines", label: "Philippines" },
  { value: "Poland", label: "Poland" },
  { value: "Portugal", label: "Portugal" },
  { value: "Qatar", label: "Qatar" },
  { value: "Romania", label: "Romania" },
  { value: "Russia", label: "Russia" },
  { value: "Rwanda", label: "Rwanda" },
  { value: "Saint Kitts and Nevis", label: "Saint Kitts and Nevis" },
  { value: "Saint Lucia", label: "Saint Lucia" },
  {
    value: "Saint Vincent and the Grenadines",
    label: "Saint Vincent and the Grenadines",
  },
  { value: "Samoa", label: "Samoa" },
  { value: "San Marino", label: "San Marino" },
  { value: "Sao Tome and Principe", label: "Sao Tome and Principe" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "Senegal", label: "Senegal" },
  { value: "Serbia", label: "Serbia" },
  { value: "Seychelles", label: "Seychelles" },
  { value: "Sierra Leone", label: "Sierra Leone" },
  { value: "Singapore", label: "Singapore" },
  { value: "Slovakia", label: "Slovakia" },
  { value: "Slovenia", label: "Slovenia" },
  { value: "Solomon Islands", label: "Solomon Islands" },
  { value: "Somalia", label: "Somalia" },
  { value: "South Africa", label: "South Africa" },
  { value: "South Sudan", label: "South Sudan" },
  { value: "Spain", label: "Spain" },
  { value: "Sri Lanka", label: "Sri Lanka" },
  { value: "Sudan", label: "Sudan" },
  { value: "Suriname", label: "Suriname" },
  { value: "Sweden", label: "Sweden" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Syria", label: "Syria" },
  { value: "Taiwan", label: "Taiwan" },
  { value: "Tajikistan", label: "Tajikistan" },
  { value: "Tanzania", label: "Tanzania" },
  { value: "Thailand", label: "Thailand" },
  { value: "Timor-Leste", label: "Timor-Leste" },
  { value: "Togo", label: "Togo" },
  { value: "Tonga", label: "Tonga" },
  { value: "Trinidad and Tobago", label: "Trinidad and Tobago" },
  { value: "Tunisia", label: "Tunisia" },
  { value: "Turkey", label: "Turkey" },
  { value: "Turkmenistan", label: "Turkmenistan" },
  { value: "Tuvalu", label: "Tuvalu" },
  { value: "Uganda", label: "Uganda" },
  { value: "Ukraine", label: "Ukraine" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "United States", label: "United States" },
  { value: "Uruguay", label: "Uruguay" },
  { value: "Uzbekistan", label: "Uzbekistan" },
  { value: "Vanuatu", label: "Vanuatu" },
  { value: "Vatican City", label: "Vatican City" },
  { value: "Venezuela", label: "Venezuela" },
  { value: "Vietnam", label: "Vietnam" },
  { value: "Yemen", label: "Yemen" },
  { value: "Zambia", label: "Zambia" },
  { value: "Zimbabwe", label: "Zimbabwe" },
];

export const stateOptions = [
  { value: "Alabama", label: "Alabama" },
  { value: "Alaska", label: "Alaska" },
  { value: "Arizona", label: "Arizona" },
  { value: "Arkansas", label: "Arkansas" },
  { value: "California", label: "California" },
  { value: "Colorado", label: "Colorado" },
  { value: "Connecticut", label: "Connecticut" },
  { value: "Delaware", label: "Delaware" },
  { value: "Florida", label: "Florida" },
  { value: "Georgia", label: "Georgia" },
  // Add more states as needed
];

export const careerOptions: OptionType[] = [
  { value: "Software Engineering", label: "Software Engineering" },
  { value: "Data Science", label: "Data Science" },
  { value: "Graphic Design", label: "Graphic Design" },
  { value: "Marketing", label: "Marketing" },
  { value: "Finance", label: "Finance" },
  { value: "Healthcare Administration", label: "Healthcare Administration" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Law", label: "Law" },
  { value: "Entrepreneurship", label: "Entrepreneurship" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Journalism", label: "Journalism" },
  { value: "Architecture", label: "Architecture" },
];