import DirectorySection from "./components/DirectorySection";
import AssignmentsSection from "./components/AssignmentsSection";
import Footer from "./components/Footer";

export default function ClassroomPage() {
  return (
    <div className="fade-in-view">
      <DirectorySection />
      <AssignmentsSection />
      <Footer />
    </div>
  );
}
