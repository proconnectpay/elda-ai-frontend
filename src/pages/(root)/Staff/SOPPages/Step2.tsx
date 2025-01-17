import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useCandidates } from "@/hooks/useCandidiates";
import { postEditedCandidate } from "@/lib/actions/staff.actions";
import { toast } from "@/components/ui/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import Cookies from "js-cookie";

const Step2 = ({
  prevStep,
  candidateId: id,
}: {
  prevStep: () => void;
  candidateId: string;
}) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const routeType = searchParams.get("type");
  const [manualDescription, setManualDescription] = useState("");
  const [programType, setProgramType] = useState("");
  const [assignedUniversity, setAssignedUniversity] = useState("");
  const [assignedCourse, setAssignedCourse] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [courseDescriptionLoading, setCourseDescriptionLoading] =
    useState(false);

  const { singleCandidate, singleCandidateLoading, singleCandidateError } =
    useCandidates(id);

  const prefix = routeType === "school2" ? "2" : "1";

  const staffToken = Cookies.get("staff_access_token");
  if (!staffToken) {
    navigate("/sign-in");
    console.error("Staff token is missing. Please log in again.");
    return null;
  }

  useEffect(() => {
    if (singleCandidate) {
      setProgramType(singleCandidate[`program_type${prefix}`] || "");
      setAssignedUniversity(
        singleCandidate[`assigned_university${prefix}`] || ""
      );
      setAssignedCourse(singleCandidate[`assigned_course${prefix}`] || "");
      setYearsOfExperience(
        singleCandidate.career[0]?.years_of_experience_post_degree || "0"
      );
      setManualDescription(singleCandidate[`course_description${prefix}`]);
    }
  }, [singleCandidate, routeType]);

  const handleReview = async (e: React.MouseEvent) => {
    e.preventDefault();
    setCourseDescriptionLoading(true);
    try {
      const response = await postEditedCandidate(
        id,
        {
          [`course_description${prefix}`]: manualDescription,
        },
        staffToken
      );
      toast({
        variant: "success",
        title: "Course Description Updated",
        description: "Successfully Updated",
      });
      return response;
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Course Description not Updated",
        description: "Could not update",
      });
    } finally {
      setCourseDescriptionLoading(false);
    }
  };

  if (singleCandidateLoading) return <div>Loading...</div>;
  if (singleCandidateError) return <div>Error fetching data</div>;

  return (
    <>
      <div className="bg-gray w-full min-h-[50vh] rounded-3xl px-4 py-10 lg:p-12">
        <div className="w-16 cursor-pointer relative mb-5" onClick={prevStep}>
          <ChevronLeftIcon color="red" />
          <div className="bg-red w-5 h-0.5 absolute top-[11px] left-[11px]"></div>
        </div>
        <div className="flex items-start flex-col gap-8 justify-center mx-auto">
          <h2 className="text-red font-bold text-center w-full text-lg md:text-3xl">
            Candidate&apos;s Details
          </h2>

          <div className="flex flex-col lg:flex-row justify-between w-full gap-6 lg:gap-12 items-center">
            <div className="flex flex-col gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="programType" className="text-sm">
                Program Type
              </label>
              <input
                type="text"
                id="programType"
                name="programType"
                value={programType}
                onChange={(e) => setProgramType(e.target.value)}
                className="bg-transparent"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="assignedUniversity" className="text-sm">
                Assigned University
              </label>
              <input
                type="text"
                id="assignedUniversity"
                name="assignedUniversity"
                value={assignedUniversity}
                onChange={(e) => setAssignedUniversity(e.target.value)}
                className="bg-transparent outline-none"
                disabled
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between w-full gap-6 lg:gap-12 items-center">
            <div className="flex flex-col gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="assignedCourse" className="text-sm">
                Assigned Course
              </label>
              <input
                type="text"
                id="assignedCourse"
                name="assignedCourse"
                value={assignedCourse}
                onChange={(e) => setAssignedCourse(e.target.value)}
                className="bg-transparent outline-none"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 border border-gray-border w-full lg:w-1/2 rounded-lg py-1 px-4">
              <label htmlFor="yearsOfExperience" className="text-sm">
                Number of Years of Professional Work Experience
              </label>
              <input
                type="text"
                id="yearsOfExperience"
                name="yearsOfExperience"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(e.target.value)}
                className="bg-transparent outline-none"
                disabled
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 border border-gray-border w-full rounded-lg py-1 px-4">
            <label htmlFor="courseDescription" className="text-sm">
              Manually Add Course Description
            </label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={manualDescription}
              onChange={(e) => setManualDescription(e.target.value)}
              className="bg-transparent outline-none min-h-20 md:min-h-20"
              placeholder="A brief course description about the course"
            />
            <div className="flex items-center my-4 justify-end w-full">
              <Button
                className="bg-red hover:bg-red hover:bg-opacity-40 text-white h-10"
                onClick={handleReview}
                disabled={courseDescriptionLoading}
              >
                {courseDescriptionLoading ? (
                  <>
                    <p>Saving</p> &nbsp;
                    <Loader2 className="animate-spin" />
                  </>
                ) : (
                  "Save Course Description"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Step2;
