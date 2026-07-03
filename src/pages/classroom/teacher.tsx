import React, { useState } from "react";
import {
  Calendar,
  Clock,
  ArrowRight,
  FileText,
  Headphones,
  Mail,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export default function TeacherClassroom() {
  return (
    <div className="fade-in-view">
      {/* Header */}
      <div className="border-b-4 border-[#000000] pb-6 mb-[40px]">
        <span className="font-sans text-[10px] leading-none tracking-[0.08em] font-bold text-[#444748] uppercase mb-2 block">
          Advanced French Literature
        </span>
        <h2 className="font-serif text-[32px] leading-[1.2] font-black text-[#000000]">
          Seminar: Proust & Memory
        </h2>
        <div className="flex flex-wrap items-center gap-4 mt-4 text-[#444748]">
          <span className="flex items-center gap-1 font-sans text-[12px] leading-none font-bold">
            <Calendar size={14} /> Autumn Term, Week 4
          </span>
          <span className="flex items-center gap-1 font-sans text-[12px] leading-none font-bold">
            <Clock size={14} /> Tuesdays, 14:00 CET
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[40px] pb-24">
        {/* Left Column: Course Ledger */}
        <div className="lg:col-span-8 space-y-[40px]">
          <section>
            <h3 className="font-serif text-[20px] leading-[1.4] font-bold text-[#000000] mb-6 border-b border-[#e2e2e2] pb-2">
              The Course Ledger
            </h3>

            <div className="space-y-6">
              {/* Assignment Card 1 */}
              <article className="bg-white border-t-4 border-[#000000] border-l border-r border-b border-[#e2e2e2] p-[20px] group hover:bg-[#f4f4f4] transition-colors duration-300 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="font-sans text-[10px] leading-none tracking-[0.08em] font-bold uppercase text-[#3d627b] mb-2 block">
                      Week 4 • Required Reading
                    </span>
                    <h4 className="font-serif text-[20px] leading-[1.4] font-bold text-[#000000] group-hover:text-[#3d627b] transition-colors">
                      La réforme écologique
                    </h4>
                  </div>
                  <span className="bg-[#e2e2e2] text-[#000000] font-sans text-[12px] leading-none font-bold px-2 py-1 rounded-sm whitespace-nowrap ml-2">
                    Due Oct 15
                  </span>
                </div>
                <p className="font-serif text-[14px] leading-[1.5] italic text-[#444748] mb-6">
                  Read an excerpt from Le Monde on environmental reforms. Answer
                  comprehension questions in French context.
                </p>
                <div className="flex items-center justify-between border-t border-[#e2e2e2] pt-4 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 sm:w-32 bg-[#e2e2e2] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#3d627b] h-full rounded-full"
                        style={{ width: "0%" }}
                      ></div>
                    </div>
                    <span className="font-sans text-[12px] leading-none font-bold text-[#444748]">
                      0% Complete
                    </span>
                  </div>
                  <Link
                    to="/activity/$activityId"
                    params={{ activityId: "activity-1" }}
                    className="border border-[#000000] text-[#000000] px-4 py-2 font-sans text-[12px] uppercase tracking-widest leading-[1.4] font-bold hover:bg-[#000000] hover:text-white transition-colors flex items-center gap-2 rounded-sm cursor-pointer"
                  >
                    Start Assignment
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>

              {/* Assignment Card 2 */}
              <article className="bg-white border border-[#e2e2e2] p-[20px] group hover:bg-[#f4f4f4] transition-colors duration-300 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="font-sans text-[10px] leading-none tracking-[0.08em] font-bold uppercase text-[#444748] mb-2 block">
                      Week 4 • Phonetic Drill
                    </span>
                    <h4 className="font-serif text-[20px] leading-[1.4] font-bold text-[#000000]">
                      Le Défi Phonétique
                    </h4>
                  </div>
                  <span className="bg-[#e2e2e2] text-[#000000] font-sans text-[12px] leading-none font-bold px-2 py-1 rounded-sm whitespace-nowrap ml-2">
                    Due Oct 17
                  </span>
                </div>
                <p className="font-serif text-[14px] leading-[1.5] italic text-[#444748] mb-6">
                  Listen carefully to the pronunciation of the target word.
                  Observe the mouth placement and reproduce the sound
                  accurately.
                </p>
                <div className="flex items-center justify-between border-t border-[#e2e2e2] pt-4 mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 sm:w-32 bg-[#e2e2e2] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#3d627b] h-full rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                    <span className="font-sans text-[12px] leading-none font-bold text-[#444748]">
                      45% Complete
                    </span>
                  </div>
                  <Link
                    to="/activity/$activityId"
                    params={{ activityId: "activity-5" }}
                    className="border border-[#000000] text-[#000000] px-4 py-2 font-sans text-[12px] uppercase tracking-widest leading-[1.4] font-bold hover:bg-[#000000] hover:text-white transition-colors flex items-center gap-2 rounded-sm cursor-pointer"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </article>
            </div>
          </section>

          {/* Resource Archive */}
          <section>
            <h3 className="font-serif text-[20px] leading-[1.4] font-bold text-[#000000] mb-6 border-b border-[#e2e2e2] pb-2">
              Resource Archive
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href="#"
                className="flex items-center gap-4 p-4 border border-[#e2e2e2] bg-white hover:bg-[#f4f4f4] transition-colors group shadow-sm rounded-sm"
              >
                <div className="bg-[#e2e2e2] p-2 text-[#000000] group-hover:bg-[#3d627b] group-hover:text-white transition-colors rounded-sm">
                  <FileText size={24} />
                </div>
                <div>
                  <h5 className="font-sans text-[14px] leading-[1.4] font-bold text-[#000000]">
                    Syllabus Overview
                  </h5>
                  <span className="font-sans text-[12px] leading-none font-bold text-[#444748]">
                    PDF • 1.2 MB
                  </span>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-4 p-4 border border-[#e2e2e2] bg-white hover:bg-[#f4f4f4] transition-colors group shadow-sm rounded-sm"
              >
                <div className="bg-[#e2e2e2] p-2 text-[#000000] group-hover:bg-[#3d627b] group-hover:text-white transition-colors rounded-sm">
                  <Headphones size={24} />
                </div>
                <div>
                  <h5 className="font-sans text-[14px] leading-[1.4] font-bold text-[#000000]">
                    Pronunciation Guide
                  </h5>
                  <span className="font-sans text-[12px] leading-none font-bold text-[#444748]">
                    Audio • 15 Mins
                  </span>
                </div>
              </a>
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar info */}
        <aside className="lg:col-span-4 space-y-[40px]">
          {/* Instructor Profile */}
          <div className="bg-white border-t-4 border-[#000000] border-l border-r border-b border-[#e2e2e2] p-[20px] shadow-sm">
            <span className="font-sans text-[10px] leading-none tracking-[0.08em] font-bold uppercase text-[#444748] mb-4 block">
              Lead Instructor
            </span>
            <div className="flex items-center gap-4 mb-4">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt4z-Mh_kKhz6YS28Sgj3wUXJPAie8ftqhu3xghnTYl7-GA1z3JIoXH8jbSHh25Yg74GX-HVGBFtKMe30tUg1Q-mM2m9hSJuIgvXRuWgnnsE4MCKFl8j-G4SJ58oyA7oXoL68l4F-creHY2648MqD6MguQ40ilH5xJFT0x9bYUFbWAvUXDA2VJ4BuVGY9vN1dUkCwjXeDYtX3I2HOntA0BJ2J1DuRuZWSuGiAc7_SbmXKii05Kr5c2OQVBpdWxY03JDL5pjuA4itc"
                alt="Professor Laurent"
                className="w-16 h-16 rounded-full grayscale object-cover border border-[#e2e2e2]"
              />
              <div>
                <h4 className="font-serif text-[20px] leading-[1.4] font-bold text-[#000000]">
                  Mme. Laurent
                </h4>
                <p className="font-sans text-[12px] leading-none font-bold text-[#444748]">
                  Ph.D. Sorbonne Université
                </p>
              </div>
            </div>
            <button className="w-full border border-[#000000] text-[#000000] py-2 font-sans text-[12px] uppercase tracking-widest leading-[1.4] font-bold hover:bg-[#000000] hover:text-white transition-colors flex items-center justify-center gap-2 rounded-sm cursor-pointer">
              <Mail size={16} />
              Contact Instructor
            </button>
          </div>

          {/* Active Roster */}
          <div className="bg-white border border-[#e2e2e2] p-[20px] shadow-sm">
            <div className="flex justify-between items-center mb-4 border-b border-[#e2e2e2] pb-2">
              <h4 className="font-serif text-[20px] leading-[1.4] font-bold text-[#000000]">
                Active Roster
              </h4>
              <span className="font-sans text-[12px] leading-none font-bold text-[#444748]">
                12 Students
              </span>
            </div>

            <ul className="space-y-3">
              <li className="flex items-center justify-between group cursor-pointer p-1 -mx-1 hover:bg-[#f4f4f4] rounded-sm transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#f4f4f4] rounded-full flex items-center justify-center text-[#000000] font-sans font-bold text-xs">
                    AJ
                  </div>
                  <span className="font-sans text-[14px] leading-[1.4] font-medium text-[#000000] group-hover:text-[#3d627b] transition-colors">
                    Arthur J.
                  </span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#3d627b]"></span>
              </li>
              <li className="flex items-center justify-between group cursor-pointer p-1 -mx-1 hover:bg-[#f4f4f4] rounded-sm transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#f4f4f4] rounded-full flex items-center justify-center text-[#000000] font-sans font-bold text-xs">
                    EM
                  </div>
                  <span className="font-sans text-[14px] leading-[1.4] font-medium text-[#000000] group-hover:text-[#3d627b] transition-colors">
                    Emma M.
                  </span>
                </div>
              </li>
              <li className="flex items-center justify-between group cursor-pointer p-1 -mx-1 hover:bg-[#f4f4f4] rounded-sm transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#f4f4f4] rounded-full flex items-center justify-center text-[#000000] font-sans font-bold text-xs">
                    DB
                  </div>
                  <span className="font-sans text-[14px] leading-[1.4] font-medium text-[#000000] group-hover:text-[#3d627b] transition-colors">
                    David B.
                  </span>
                </div>
                <span className="w-2 h-2 rounded-full bg-[#3d627b]"></span>
              </li>
            </ul>

            <button className="mt-4 text-[#3d627b] font-sans text-[12px] uppercase tracking-widest leading-[1.4] font-bold hover:underline w-full text-center cursor-pointer">
              View Full Roster
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
