import { useParams } from "@tanstack/react-router";
import { ACTIVITIES } from "../../data/activities";
import VisualMatcher from "../../components/activities/VisualMatcher";
import ReadingSession from "../../components/activities/ReadingSession";
import InteractiveContextClue from "../../components/activities/InteractiveContextClue";
import TextReconstruction from "../../components/activities/TextReconstruction";
import PhonemeMatcher from "../../components/activities/PhonemeMatcher";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export default function ActivityPage() {
  const { activityId } = useParams({ strict: false });

  const activity = ACTIVITIES.find((a) => a.id === activityId);

  if (!activity) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-5 text-center block fade-in-view">
        <h1 className="text-4xl font-serif font-black mb-4">
          Activity Not Found
        </h1>
        <p className="mb-8">The activity you are looking for does not exist.</p>
      </div>
    );
  }

  switch (activity.type) {
    case "VISUAL_MATCHER":
      return <VisualMatcher data={activity.data} />;
    case "READING_SESSION":
      return <ReadingSession data={activity.data} level={activity.level} />;
    case "INTERACTIVE_CONTEXT_CLUE":
      return (
        <InteractiveContextClue data={activity.data} level={activity.level} />
      );
    case "TEXT_RECONSTRUCTION":
      return <TextReconstruction data={activity.data} level={activity.level} />;
    case "PHONEME_MATCHER":
      return <PhonemeMatcher data={activity.data} level={activity.level} />;
    default:
      return <div>Unsupported activity type</div>;
  }
}
