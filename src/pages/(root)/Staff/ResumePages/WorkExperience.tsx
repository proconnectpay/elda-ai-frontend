import { useCandidates } from "@/hooks/useCandidiates";
import { formatDate, getErrorMessage } from "@/lib/utils";
import { JobExperience, ResumeStep4FormData } from "@/types";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import "react-phone-input-2/lib/style.css";
import { useParams } from "react-router-dom";

const WorkExperience = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeStep4FormData>();
  const { id } = useParams<{ id: string }>();
  if (!id) {
    console.error("No ID provided");
    return;
  }
  const { singleCandidate, singleCandidateLoading, singleCandidateError } =
    useCandidates(id);
  const [jobsToShow, setJobsToShow] = useState("0");

  useEffect(() => {
    if (singleCandidate) {
      const filteredJobExperiences = singleCandidate.job_experience.filter(
        (experience: JobExperience) => experience.business_name
      );

      setJobsToShow(String(filteredJobExperiences.length));

      filteredJobExperiences.forEach(
        (experience: JobExperience, index: number) => {
          setValue(
            `jobExperiences.${index}.nameOfCompany`,
            experience.business_name || ""
          );
          setValue(
            `jobExperiences.${index}.jobTitle`,
            experience.job_title || ""
          );
          setValue(
            `jobExperiences.${index}.jobDescription`,
            experience.job_summary || ""
          );
          setValue(
            `jobExperiences.${index}.mode`,
            experience.employment_type || ""
          );
          setValue(`jobExperiences.${index}.location`, experience.state || "");
          setValue(
            `jobExperiences.${index}.startDate`,
            formatDate(experience.year_started) || ""
          );
          if (experience.year_ended) {
            setValue(
              `jobExperiences.${index}.endDate`,
              formatDate(experience.year_ended) || ""
            );
          }
        }
      );
    }
  }, [singleCandidate, id, setValue]);

  if (singleCandidateLoading) {
    return <div>Loading...</div>;
  }

  if (singleCandidateError) {
    return <div>Error fetching data</div>;
  }

  const filteredJobExperiences =
    singleCandidate?.job_experience?.filter(
      (experience: JobExperience) => experience.business_name
    ) || [];

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="" className="text-[#344054]">
          How many jobs are you showcasing?
        </label>
        <div className="rounded-full w-full border py-2 pl-4 border-gray-border">
          {jobsToShow}
        </div>
      </div>

      {filteredJobExperiences.map(
        (experience: JobExperience, index: number) => (
          <div
            key={index}
            className="bg-gray py-9 px-5 sm:px-10 rounded-2xl md:rounded-3xl"
          >
            <h3 className="font-bold mb-4 text-lg">
              Job History: {experience.business_name}
            </h3>
            <div className="flex flex-col gap-8">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                <div className="flex flex-col w-full">
                  <label htmlFor="nameOfCompany" className="text-[#344054]">
                    Name of Company
                  </label>
                  <input
                    className="border border-gray-border rounded-full py-2 px-4"
                    // id="nameOfCompany"
                    id={`nameOfCompany-${index}`}
                    {...register(`jobExperiences.${index}.nameOfCompany`)}
                    placeholder="Enter your first name"
                  />
                  {errors.nameOfCompany && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.nameOfCompany)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                <div className="flex flex-col sm:w-1/2">
                  <label
                    htmlFor={`jobTitle-${index}`}
                    className="text-[#344054]"
                  >
                    Job Title
                  </label>
                  <input
                    className="border border-gray-border rounded-full py-2 px-4"
                    id={`jobTitle-${index}`}
                    {...register(`jobExperiences.${index}.jobTitle`)}
                    placeholder="Enter your job title"
                  />
                  {errors.jobTitle && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.jobTitle)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:w-1/2">
                  <label htmlFor={`mode-${index}`} className="text-[#344054]">
                    Mode
                  </label>
                  <input
                    className="border capitalize border-gray-border rounded-full py-2 px-4"
                    id={`mode-${index}`}
                    {...register(`jobExperiences.${index}.mode`)}
                    placeholder="Hybrid"
                  />
                  {errors.mode && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.mode)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor={`jobDescription-${index}`}
                    className="text-[#344054]"
                  >
                    Job Description
                  </label>
                  <textarea
                    className="border border-gray-border py-2 px-4 min-h-20"
                    id={`jobDescription-${index}`}
                    {...register(`jobExperiences.${index}.jobDescription`)}
                    placeholder="Enter job description"
                  />
                  {errors.jobDescription && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.jobDescription)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 md:gap-8">
                <div className="flex flex-col sm:w-1/2">
                  <label
                    htmlFor={`location-${index}`}
                    className="text-[#344054]"
                  >
                    Location
                  </label>
                  <input
                    className="border border-gray-border rounded-full py-2 px-4"
                    id={`location-${index}`}
                    {...register(`jobExperiences.${index}.location`)}
                    placeholder="Enter location"
                  />
                  {errors.location && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.location)}
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:w-1/2">
                  <label
                    htmlFor={`startDate-${index}`}
                    className="text-[#344054]"
                  >
                    Start Date
                  </label>
                  <input
                    type="text"
                    className="border border-gray-border h-[42px] rounded-full py-2 px-4"
                    id={`startDate-${index}`}
                    {...register(`jobExperiences.${index}.startDate`)}
                  />
                  {errors.startDate && (
                    <span className="text-red text-sm">
                      {getErrorMessage(errors.startDate)}
                    </span>
                  )}
                </div>
                {experience.year_ended !== "1960-01-01" && (
                  <div className="flex flex-col sm:w-1/2">
                    <label
                      htmlFor={`endDate-${index}`}
                      className="text-[#344054]"
                    >
                      End Date
                    </label>
                    <input
                      type="text"
                      className="border border-gray-border h-[42px] rounded-full py-2 px-4"
                      id={`endDate-${index}`}
                      {...register(`jobExperiences.${index}.endDate`)}
                    />
                    {errors.endDate && (
                      <span className="text-red text-sm">
                        {getErrorMessage(errors.endDate)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default WorkExperience;
