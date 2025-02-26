import { Controller, useForm } from "react-hook-form";
import PcpLogo from "@/assets/proconnect-logo-new-no-bg.png";
import PhoneInputField from "@/components/PhoneInputField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  advancedDegreeTypeOptions,
  classOfDegreeMastersOptions,
  classOfDegreeOptions,
  countriesOfInterestOptions,
  degreeTypeOptions,
  genderOptions,
  graduateOptions,
  membershipOptions,
  typeOfAcademicDegreeOptions,
  yesNoOptions,
} from "@/constants";
import { onboardSchema2 } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { z } from "zod";
import FormInput from "@/components/FormInput";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { ICountry } from "country-state-city";
import { useToast } from "@/components/ui/use-toast";

const API_URL = import.meta.env.VITE_API_URL;

const Onboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const form = useForm<z.infer<typeof onboardSchema2>>({
    resolver: zodResolver(onboardSchema2),
    mode: "onBlur",
  });
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const { toast } = useToast();

  useEffect(() => {
    const fetchCandidateDetails = async () => {
      if (!email) return;
      try {
        setIsLoading(true);
        const { data } = await axios.get(
          `${API_URL}onboarding-candidate/s/${email}/`
        );

        const nameParts = data.full_name?.split(" ") || [];
        const [first_name, middle_name, surname] =
          nameParts.length === 3
            ? nameParts
            : [nameParts[0], "", nameParts[1] || ""];
        form.reset({
          emailAddress: data.email,
          firstName: first_name || "",
          middleName: middle_name || "",
          surname: surname || "",
          phoneNumber: data.phone_number,
          whatsappNumber: data.whatsapp,
          gender: data.gender,
          graduateOf: data.graduate_of,
          dateOfBirth: data.date_of_birth
            ? new Date(data.date_of_birth)
            : undefined,
          age: data.age,
          specificCGPA: data.specific_cgpa,
          hasMasters: data.has_masters_degree ? "true" : "false",
          degreeClass: data.class_of_degree,
          courseOfStudy: data.degree?.[0]?.course || "",
          kindOfDegree: data.degree?.[0]?.degree || "",
          institutionName: data.degree?.[0]?.institution || "",
          specificCGPAMasters: data.degree?.[1]?.cgpa || "",
          classOfDegreeMasters: data.degree?.[1]?.cgpa_class || "",
          mastersCourse: data.degree?.[1]?.course || "",
          mastersDegree: data.degree?.[1]?.degree || "",
          mastersInstitution: data.degree?.[1]?.institution || "",
          countriesOfInterest:
            data.countries?.map((c: ICountry) => c.name) || [],
          typeOfAcademicDegree: data.interest?.academic_type || "",
          GMATGRE: data.interest?.open_to_gmat || "",
          academicProgram: data.interest?.specific_program || "",
          specificUniversity: data.interest?.specific_university || "",
        });
      } catch (error) {
        console.error("Error fetching candidate details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandidateDetails();
  }, [email]);

  // Function to calculate age from date of birth
  const calculateAge = (birthDate: Date) => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };

  const onSubmit = async (data: z.infer<typeof onboardSchema2>) => {
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${API_URL}onboarding-candidate/s/${data.emailAddress}/`,
        {
          ...data,
          full_name: [data.firstName, data.middleName, data.surname]
            .filter(Boolean)
            .join(" "),
          email: data.emailAddress,
          phone_number: data.phoneNumber,
          gender: data.gender,
          graduate_of: data.graduateOf,
          state_of_residence: "Lagos",
          date_of_birth: data.dateOfBirth
            ? new Date(data.dateOfBirth).toISOString().split("T")[0]
            : null,
          age: data.age,
          whatsapp: data.whatsappNumber,
          specific_cgpa: data.specificCGPA,
          has_masters_degree: data.hasMasters === "true",
          class_of_degree: data.degreeClass,

          degree: [
            {
              cgpa: data.specificCGPA,
              cgpa_class: data.degreeClass,
              course: data.courseOfStudy,
              degree: data.kindOfDegree,
              institution: data.institutionName,
            },
            {
              cgpa: data.specificCGPAMasters,
              cgpa_class: data.classOfDegreeMasters,
              course: data.mastersCourse,
              degree: data.mastersDegree,
              institution: data.mastersInstitution,
            },
          ],
          countries:
            data.countriesOfInterest?.map((country) => ({
              name: country,
            })) || [],
          interest: {
            academic_type: data.typeOfAcademicDegree,
            open_to_gmat: data.GMATGRE === "true" ? "Yes" : "No",
            specific_program: data.academicProgram,
            specific_university: data.specificUniversity,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response) {
        toast({
          title: "Success",
          description: "Your form has been submitted successfully.",
          variant: "default",
          className: "bg-green-500 text-white",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit form. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Submission error:", error);
      if (axios.isAxiosError(error)) {
        toast({
          title: "Error",
          description: `Failed to submit form: ${
            error.response?.data?.message || error.message
          }`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to submit form. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const uploadCV = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("resume", selectedFile);
      const email = form.getValues("emailAddress");

      if (!email) {
        toast({
          title: "Error",
          description: "Email address is required",
          variant: "destructive",
        });
        return;
      }

      const response = await axios.patch(
        `${API_URL}onboarding-candidate/s/${email}/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast({
          title: "Success",
          description: "CV uploaded successfully!",
          variant: "default",
          className: "bg-green-500 text-white",
        });
        setSelectedFile(null);
        form.setValue("uploadCV", "");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading CV:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Error uploading CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full form-bg overflow-hidden">
      <div className="flex items-center justify-center flex-col pt-8 mx-auto max-w-[500px] h-[200px]">
        <img src={PcpLogo} alt="pcp-logo" className="w-[50%] md:scale-150 " />
      </div>
      <div className="p-8 md:px-16 md:py-12 xl:px-20 flex flex-col">
        <h3 className="font-semibold text-xl sm:text-2xl">
          Candidate Onboarding Form
        </h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 pb-8"
          >
            <div className="flex flex-col gap-14">
              <div className="border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
                <h4 className="text-[25px] font-bold mb-6">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <div className="md:col-span-2">
                    <FormInput
                      control={form.control}
                      name="membershipStatus"
                      label="Membership Status"
                      type="select"
                      placeholder="Select membership status"
                      options={membershipOptions}
                    />
                  </div>
                  <div>
                    <FormInput
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      type="input"
                      placeholder="Enter your first name"
                    />
                    <span className="text-[12px] text-[#667085]">
                      as on international passport
                    </span>
                  </div>

                  <FormInput
                    control={form.control}
                    name="middleName"
                    label="Middle Name"
                    type="input"
                    placeholder="Enter your middle name"
                  />

                  <FormInput
                    control={form.control}
                    name="surname"
                    label="Surname"
                    type="input"
                    placeholder="Enter your surname"
                  />

                  <div>
                    <FormInput
                      control={form.control}
                      name="emailAddress"
                      label="Email"
                      type="input"
                      placeholder="Enter your personal email address"
                    />
                    <span className="text-[12px] text-[#667085]">
                      This will be used for the entire application process so
                      give us the right personal email
                    </span>
                  </div>

                  <PhoneInputField
                    className="md:w-full"
                    name="phoneNumber"
                    label="Phone Number"
                    labelName="font-medium text-sm"
                  />
                  <PhoneInputField
                    name="whatsappNumber"
                    label="WhatsApp Number"
                    className="md:w-full"
                    labelName="font-medium text-sm"
                  />

                  <FormInput
                    control={form.control}
                    name="gender"
                    label="Gender"
                    type="select"
                    options={genderOptions}
                    placeholder="Select your gender"
                  />
                  <div className="mb-4">
                    <label className="form-label text-sm font-medium mb-2">
                      Date of Birth
                    </label>
                    <Controller
                      name="dateOfBirth"
                      control={form.control}
                      render={({ field }) => (
                        <ReactDatePicker
                          selected={field.value}
                          onChange={(date: Date | null) => {
                            if (date) {
                              field.onChange(date);
                              // Calculate and set age when date changes
                              const age = calculateAge(date);
                              form.setValue("age", age);
                            }
                          }}
                          placeholderText="Select your date of birth"
                          dateFormat="yyyy-MM-dd"
                          showYearDropdown
                          scrollableYearDropdown
                          yearDropdownItemNumber={50}
                          maxDate={new Date()}
                          wrapperClassName="w-full"
                          className="w-full px-3 py-[7px] border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                        />
                      )}
                    />
                    {form.formState.errors.dateOfBirth && (
                      <p className="text-red-500 text-sm mt-1">
                        {form.formState.errors.dateOfBirth.message}
                      </p>
                    )}
                  </div>
                  <FormInput
                    control={form.control}
                    name="age"
                    label="How old are you"
                    type="number"
                    placeholder="Enter your age as at today"
                    className="cursor-not-allowed"
                  />
                </div>
              </div>

              {/* FIRST DEGREE */}
              <div className="flex flex-col gap-y-3 border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
                <h4 className="text-[25px] font-bold mb-6">First Degree</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <FormInput
                    control={form.control}
                    name="graduateOf"
                    label="Graduate Of"
                    type="select"
                    options={graduateOptions}
                    placeholder="--Select--"
                  />
                  <FormInput
                    control={form.control}
                    name="institutionName"
                    label="Name of University or Polytechnic Graduated from"
                    type="input"
                    placeholder=""
                  />
                  <FormInput
                    control={form.control}
                    name="kindOfDegree"
                    label="Kind Of Degree"
                    type="select"
                    placeholder="-- Select --"
                    options={degreeTypeOptions}
                  />

                  {/* Class of degree */}
                  <FormInput
                    control={form.control}
                    name="degreeClass"
                    label="Class Of Degree"
                    type="select"
                    placeholder="-- Select --"
                    options={classOfDegreeOptions}
                  />

                  <FormInput
                    control={form.control}
                    name="specificCGPA"
                    label="Specific CGPA"
                    type="input"
                    placeholder=""
                  />

                  <FormInput
                    control={form.control}
                    name="courseOfStudy"
                    label="Course of Study"
                    type="input"
                    placeholder="Enter your course of study"
                  />
                </div>
              </div>

              {/* Second Degree Details */}
              <div className="flex flex-col gap-y-3 border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
                <h4 className="text-[25px] font-bold mb-6">Second Degree</h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <FormInput
                    control={form.control}
                    name="hasMasters"
                    label="Do you have a Master's Degree"
                    type="select"
                    options={yesNoOptions}
                    placeholder="--Select--"
                  />
                  <FormInput
                    control={form.control}
                    name="mastersDegree"
                    label="If yes, kind of degree"
                    type="select"
                    placeholder=""
                    options={advancedDegreeTypeOptions}
                    required={form.watch("hasMasters") === "true"}
                  />

                  <FormInput
                    control={form.control}
                    name="mastersCourse"
                    label="Course of Study Graduated from with master's if applicable"
                    type="input"
                    placeholder=""
                    required={form.watch("hasMasters") === "true"}
                  />

                  <FormInput
                    control={form.control}
                    name="classOfDegreeMasters"
                    label="Class of degree masters"
                    type="select"
                    placeholder="-- Select --"
                    options={classOfDegreeMastersOptions}
                    required={form.watch("hasMasters") === "true"}
                  />

                  <FormInput
                    control={form.control}
                    name="specificCGPAMasters"
                    label="Specific CGPA Masters"
                    type="input"
                    placeholder=""
                    required={form.watch("hasMasters") === "true"}
                  />
                  <FormInput
                    control={form.control}
                    name="mastersInstitution"
                    label="Name Of Institution"
                    type="input"
                    placeholder=""
                    required={form.watch("hasMasters") === "true"}
                  />
                </div>
              </div>

              {/* OTHER INFORMATION */}
              <div className="flex flex-col gap-y-3 border border-pale-bg py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl bg-white">
                <h4 className="text-[25px] font-bold mb-6">
                  Other Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  <FormInput
                    control={form.control}
                    name="typeOfAcademicDegree"
                    label="Type of Academic Degree Interested in"
                    type="select"
                    placeholder="-- Select --"
                    options={typeOfAcademicDegreeOptions}
                  />

                  <FormInput
                    control={form.control}
                    name="academicProgram"
                    label="Do you have a specific academic program or course in mind that aligns with your professional experience, whether as an employee, entrepreneur, intern, or recent graduate?"
                    type="input"
                    placeholder=""
                  />
                  <FormInput
                    control={form.control}
                    name="specificUniversity"
                    label="Do you have a specific University in mind?"
                    type="input"
                    placeholder=""
                  />

                  <div className="space-y-3">
                    <Label className="text-sm font-medium">
                      Countries of Interest (Select up to 2)
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {countriesOfInterestOptions.map((country) => (
                        <div
                          key={country.value}
                          className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-50"
                        >
                          <Controller
                            name="countriesOfInterest"
                            control={form.control}
                            render={({ field }) => (
                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={country.value}
                                  checked={(field.value || []).includes(
                                    country.value
                                  )}
                                  onCheckedChange={(checked) => {
                                    const currentValue = field.value || [];
                                    if (checked) {
                                      if (currentValue.length < 2) {
                                        field.onChange([
                                          ...currentValue,
                                          country.value,
                                        ]);
                                      }
                                    } else {
                                      field.onChange(
                                        currentValue.filter(
                                          (value) => value !== country.value
                                        )
                                      );
                                    }
                                  }}
                                  disabled={
                                    (field.value || []).length >= 2 &&
                                    !(field.value || []).includes(country.value)
                                  }
                                />
                                <div className="flex items-center space-x-2">
                                  <img
                                    src={`https://flagcdn.com/24x18/${
                                      {
                                        "United States": "us",
                                        "United Kingdom": "gb",
                                        Canada: "ca",
                                        Australia: "au",
                                        Germany: "de",
                                        Switzerland: "ch",
                                        Netherlands: "nl",
                                        France: "fr",
                                        Singapore: "sg",
                                        "South Africa": "za",
                                        Portugal: "pt",
                                        China: "cn",
                                        Spain: "es",
                                        Italy: "it",
                                        Japan: "jp",
                                        Belgium: "be",
                                        Denmark: "dk",
                                        "Hong Kong": "hk",
                                      }[country.value] ||
                                      country.value.toLowerCase()
                                    }.png`}
                                    alt={`${country.label} flag`}
                                    className="w-6 h-4 object-cover rounded-sm"
                                    onError={(e) => {
                                      e.currentTarget.style.display = "none";
                                    }}
                                  />
                                  <label
                                    htmlFor={country.value}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                  >
                                    {country.label}
                                  </label>
                                </div>
                              </div>
                            )}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <FormInput
                    control={form.control}
                    name="GMATGRE"
                    label="Are you open to taking the GMAT or GRE if it is required by your selected country (or countries)?"
                    type="select"
                    options={yesNoOptions}
                    placeholder="--Select--"
                  />

                  <div className="space-y-2">
                    <FormInput
                      control={form.control}
                      name="uploadCV"
                      label="Upload your updated CV"
                      type="file"
                      placeholder=""
                      className="w-auto"
                    >
                      {(field) => (
                        <div className="flex items-center space-x-2">
                          <input
                            type="file"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                setSelectedFile(file);
                                field.onChange(file.name);
                              }
                            }}
                            className="hidden"
                            id="cv-upload"
                            accept=".pdf,.doc,.docx"
                          />
                          <label
                            htmlFor="cv-upload"
                            className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 text-sm"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-4 h-4 mr-2"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                              />
                            </svg>
                            {selectedFile ? selectedFile.name : "Upload CV"}
                          </label>
                        </div>
                      )}
                    </FormInput>
                    <Button
                      disabled={isUploading}
                      className="bg-red"
                      onClick={uploadCV}
                    >
                      {isUploading ? "Uploading..." : "Upload"}
                    </Button>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-center gap-x-6">
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => form.reset()}
                  className="px-8 border-[2px] border-red font-bold text-[20px] text-red items-center justify-center"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="items-center justify-center px-8 bg-red font-bold text-[20px] text-white"
                >
                  {isLoading ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Onboard;
