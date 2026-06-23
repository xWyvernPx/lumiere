import DirectorySection from './DirectorySection';
import AssignmentsSection from './AssignmentsSection';
import Footer from './Footer';

export default function Classroom() {
  return (
    <div className="fade-in-view">
      <DirectorySection />
      <AssignmentsSection />
      <Footer />
    </div>
  );
}
