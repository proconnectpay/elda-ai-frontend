import {
  AssignCandidateProps,
  CreateCandidateProfileProps,
  PasswordProps,
  signInProps,
} from "@/types";
import axios from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL;

export const adminSignIn = async ({ email, password }: signInProps) => {
  try {
    const response = await axios.post(`${API_URL}auth/login/`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw error;
  }
};

export const logoutAccount = async (role: "candidate" | "staff" | "admin") => {
  switch (role) {
    case "admin":
      Cookies.remove("access_token");
      break;
    case "staff":
      Cookies.remove("staff_access_token");
      break;
    case "candidate":
      Cookies.remove("candidate_access_token");
      break;
    default:
      console.log("Invalid role");
      return;
  }
  console.log(`${role} logged out`);
};

export const getAdminInfo = async () => {
  const access_token = Cookies.get("access_token"); // Fetch token from cookies

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.get(`${API_URL}admin-dashboard/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching admin info:", error);
    throw error;
  }
};

export const createCandidateProfile = async ({
  email,
  password,
  full_name,
  role,
}: CreateCandidateProfileProps) => {
  try {
    const token = Cookies.get("access_token"); // Fetch token from cookies

    if (!token) {
      throw new Error("No access token found. Login again!");
    }

    const response = await axios.post(
      `${API_URL}auth/create-user/`,
      {
        email,
        password,
        full_name,
        role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Profile creation error:", error);
    throw error;
  }
};

export const getAllCandidates = async () => {
  const access_token = Cookies.get("access_token");

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.get(`${API_URL}all-candidates/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching admin info:", error);
    throw error;
  }
};

export const getSingleCandidate = async (id: number | string) => {
  const access_token = Cookies.get("access_token"); // Fetch token from cookies

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.get(`${API_URL}all-candidates/${id}/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching admin info:", error);
    throw error;
  }
};

export const getAllStaff = async () => {
  const access_token = Cookies.get("access_token"); // Fetch token from cookies

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.get(`${API_URL}all-staffs/`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching admin info:", error);
    throw error;
  }
};

export const getSingleStaff = async (id: number | string) => {
  const access_token = Cookies.get("access_token"); // Fetch token from cookies

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.get(`${API_URL}all-staffs/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching admin info:", error);
    throw error;
  }
};

export const assignCandidateToStaff = async ({
  candidate_ids,
  staff_id,
}: AssignCandidateProps) => {
  const access_token = Cookies.get("access_token"); // Fetch token from cookies

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const response = await axios.post(
      `${API_URL}assign-candidate/`,
      { candidate_ids, staff_id },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error assigning candidate:", error);
    throw error;
  }
};

export const getLoggedInUser = async (
  role: "staff" | "admin" | "candidate"
) => {
  try {
    let token;
    if (role === "staff") {
      token = Cookies.get("staff_access_token"); // Fetch from cookies
    } else if (role === "admin") {
      token = Cookies.get("access_token"); // Fetch from cookies
    } else if (role === "candidate") {
      token = Cookies.get("candidate_access_token"); // Fetch from cookies
    }

    if (!token) return null;

    const response = await axios.get(`${API_URL}auth/detail/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to get logged-in user", error);
    return null;
  }
};

export const updatePassword = async ({
  old_password,
  new_password,
  re_new_password,
}: PasswordProps) => {
  try {
    const token = Cookies.get("access_token"); // Fetch from cookies
    if (!token) return null;

    const response = await axios.patch(
      `${API_URL}auth/update-password/`,
      {
        old_password,
        new_password,
        re_new_password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Failed to get logged-in user", error);
    return null;
  }
};

export const getAllActivities = async (url?: string) => {
  const access_token = Cookies.get("access_token"); // Fetch token from cookies

  if (!access_token) {
    throw new Error("Access token is missing. Please sign in again.");
  }

  try {
    const requestUrl = url ? url : `${API_URL}all-activities/`;

    const response = await axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }
};

export const updateUsers = async ({
  email,
  full_name,
}: {
  email: string;
  full_name: string;
}) => {
  try {
    const token = Cookies.get("access_token"); // Fetch from cookies
    if (!token) return null;

    const response = await axios.patch(
      `${API_URL}auth/update-user/`,
      {
        email,
        full_name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
