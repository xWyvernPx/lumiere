import React from "react";
import { Link } from "@tanstack/react-router";
import { Plus, MessageCircle, Eye, Bookmark, Headphones } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="fade-in-view pb-24">
      {/* Page Header */}
      <div className="flex justify-between items-end border-b-4 border-black pb-4 mb-10">
        <div>
          <h2 className="text-[32px] leading-[1.2] font-black text-black font-serif">
            Community Desk
          </h2>
          <p className="text-[14px] leading-[1.5] text-[#444748] mt-2 max-w-2xl font-serif italic">
            A peer-led hub for shared resources, essays, and collaborative
            revision. Contribute to the collective knowledge of the Lumière
            community.
          </p>
        </div>
        <button className="hidden md:flex items-center gap-2 bg-black text-white px-6 py-3 text-[12px] uppercase tracking-widest leading-[1.4] font-bold hover:bg-[#1a1c1c] transition-colors rounded-sm cursor-pointer">
          <Plus size={18} />
          Contribute Resource
        </button>
      </div>

      <button className="md:hidden w-full mb-10 flex items-center justify-center gap-2 bg-black text-white px-6 py-3 text-[12px] uppercase tracking-widest leading-[1.4] font-bold hover:bg-[#1a1c1c] transition-colors rounded-sm cursor-pointer">
        <Plus size={18} />
        Contribute Resource
      </button>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left Column (Featured / Recent) */}
        <div className="md:col-span-8 flex flex-col gap-6">
          {/* High Priority Card */}
          <article className="bg-white border-t-4 border-black border-l border-r border-b border-[#e2e2e2] p-5 flex flex-col gap-4 shadow-sm relative group">
            <Link
              to="/activity/$activityId"
              params={{ activityId: "activity-4" }}
              className="absolute inset-0 z-10"
              aria-label="View activity"
            ></Link>
            <div className="flex justify-between items-start">
              <span className="text-[10px] leading-none tracking-[0.08em] font-bold text-[#3d627b] uppercase">
                Community Drill
              </span>
              <span className="text-[12px] leading-none font-bold text-[#747878]">
                2h ago
              </span>
            </div>
            <h3 className="text-[20px] leading-[1.4] font-bold text-black font-serif group-hover:text-[#3d627b] transition-colors relative z-20">
              Sentence Unscramble: La routine matinale
            </h3>
            <p className="text-[14px] leading-[1.4] font-medium text-[#444748] line-clamp-3 relative z-20">
              Drag and drop the scrambled sentences back into the correct,
              logical sequence. A great way to practice syntax!
            </p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#e2e2e2] relative z-20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#e2e2e2] overflow-hidden">
                  <img
                    className="w-full h-full object-cover grayscale"
                    alt="Marie D."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZMneNyHoUfbqi2ounkTmo2bhRxbhP-o_YnrAIXHVSdNY0CuPh63VXK6kwAtZbswUI3dZB2cq2rEPvUrP2Ahs9q6WOXd2bpha67LQoPxADj3JY4US1_NqXYfaiVpYTkajo_5w6HuwWEnBc_JXzmOBBv-JqAxtEjsya-HkXxjfRgupeDO2P6P3MwHJf2orjeH_V_dbcYmr49BeeZiqT0iqQiCRQpPyekKh_cjCPmmrpcNHXjbvUcS7XAq2n68W2RYiVP3gSDwbut8A"
                  />
                </div>
                <span className="text-[12px] leading-none font-bold text-[#1a1c1c]">
                  Marie D.
                </span>
              </div>
              <div className="flex gap-3 text-[#747878]">
                <button className="flex items-center gap-1 hover:text-black transition-colors cursor-pointer">
                  <MessageCircle size={16} />
                  <span className="text-[12px] leading-none font-bold">4</span>
                </button>
                <button className="flex items-center gap-1 hover:text-black transition-colors cursor-pointer">
                  <Eye size={16} />
                  <span className="text-[12px] leading-none font-bold">12</span>
                </button>
              </div>
            </div>
          </article>

          {/* Secondary Card Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Resource Card 1 */}
            <article className="bg-white border border-[#e2e2e2] p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative group">
              <Link
                to="/activity/$activityId"
                params={{ activityId: "activity-3" }}
                className="absolute inset-0 z-10"
                aria-label="View activity"
              ></Link>
              <div className="flex justify-between items-center">
                <span className="text-[10px] leading-none tracking-[0.08em] font-bold text-[#444748] uppercase">
                  Curated Drill
                </span>
                <Bookmark
                  size={18}
                  className="text-[#747878] group-hover:text-[#3d627b] transition-colors relative z-20"
                />
              </div>
              <h4 className="text-[14px] leading-[1.4] font-bold text-black group-hover:text-[#3d627b] transition-colors relative z-20">
                Interactive Context Clue
              </h4>
              <p className="text-[14px] leading-[1.4] font-medium text-[#444748] text-sm relative z-20">
                Read a short paragraph and guess the meaning of highlighted
                vocabulary words based on context.
              </p>
              <div className="mt-auto pt-3 border-t border-[#e2e2e2] flex justify-between items-center relative z-20">
                <span className="text-[12px] leading-none font-bold text-[#747878]">
                  By Alex J.
                </span>
                <span className="text-[12px] leading-none font-bold text-[#747878]">
                  Interactive
                </span>
              </div>
            </article>

            {/* Resource Card 2 */}
            <article className="bg-white border border-[#e2e2e2] p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative group">
              <Link
                to="/activity/$activityId"
                params={{ activityId: "activity-2" }}
                className="absolute inset-0 z-10"
                aria-label="View activity"
              ></Link>
              <div className="flex justify-between items-center">
                <span className="text-[10px] leading-none tracking-[0.08em] font-bold text-[#444748] uppercase">
                  Visual Matcher
                </span>
                <Headphones
                  size={18}
                  className="text-[#747878] group-hover:text-[#3d627b] transition-colors relative z-20"
                />
              </div>
              <h4 className="text-[14px] leading-[1.4] font-bold text-black group-hover:text-[#3d627b] transition-colors relative z-20">
                Visual Matcher: Domestic Life
              </h4>
              <p className="text-[14px] leading-[1.4] font-medium text-[#444748] text-sm relative z-20">
                Match descriptive French statements and dialogues with their
                accurate visual representations.
              </p>
              <div className="mt-auto pt-3 border-t border-[#e2e2e2] flex justify-between items-center relative z-20">
                <span className="text-[12px] leading-none font-bold text-[#747878]">
                  By Sam T.
                </span>
                <span className="text-[12px] leading-none font-bold text-[#747878]">
                  Interactive
                </span>
              </div>
            </article>
          </div>
        </div>

        {/* Right Column (Sidebar/Widget) */}
        <aside className="md:col-span-4 flex flex-col gap-6">
          {/* Activity Widget */}
          <div className="bg-[#f4f4f4] p-5 border border-[#e2e2e2]">
            <h3 className="text-[20px] leading-[1.4] font-bold text-black mb-4 pb-2 border-b-2 border-black font-serif">
              Upcoming Activities
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3">
                <div className="flex flex-col items-center min-w-[40px]">
                  <span className="text-[10px] leading-none tracking-[0.08em] font-bold text-[#3d627b]">
                    OCT
                  </span>
                  <span className="text-[14px] leading-[1.4] font-bold text-black">
                    12
                  </span>
                </div>
                <div className="border-l-2 border-[#e2e2e2] pl-3">
                  <h4 className="text-[14px] leading-[1.4] font-bold text-black text-sm">
                    Conversation Exchange
                  </h4>
                  <p className="text-[12px] leading-none font-bold text-[#444748] mt-1">
                    Focus: Current Events
                  </p>
                  <button className="text-[10px] uppercase tracking-widest leading-none font-bold text-[#3d627b] mt-2 hover:underline inline-block cursor-pointer">
                    Join Group
                  </button>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex flex-col items-center min-w-[40px]">
                  <span className="text-[10px] leading-none tracking-[0.08em] font-bold text-[#3d627b]">
                    OCT
                  </span>
                  <span className="text-[14px] leading-[1.4] font-bold text-black">
                    15
                  </span>
                </div>
                <div className="border-l-2 border-[#e2e2e2] pl-3">
                  <h4 className="text-[14px] leading-[1.4] font-bold text-black text-sm">
                    Essay Peer-Review Session
                  </h4>
                  <p className="text-[12px] leading-none font-bold text-[#444748] mt-1">
                    Topic: French Cinema
                  </p>
                  <button className="text-[10px] uppercase tracking-widest leading-none font-bold text-[#3d627b] mt-2 hover:underline inline-block cursor-pointer">
                    RSVP
                  </button>
                </div>
              </li>
            </ul>
          </div>

          {/* Top Contributors */}
          <div className="bg-white p-5 border border-[#e2e2e2] shadow-sm">
            <h3 className="text-[10px] leading-none tracking-[0.08em] font-bold text-[#444748] uppercase tracking-widest mb-4">
              Top Contributors This Week
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#e2e2e2] overflow-hidden flex items-center justify-center text-[10px] font-bold text-[#444748]">
                    EL
                  </div>
                  <span className="text-[14px] leading-[1.4] font-medium text-black text-sm">
                    Emma L.
                  </span>
                </div>
                <span className="text-[12px] leading-none font-bold text-[#747878]">
                  12 Contributions
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#e2e2e2] overflow-hidden flex items-center justify-center text-[10px] font-bold text-[#444748]">
                    LM
                  </div>
                  <span className="text-[14px] leading-[1.4] font-medium text-black text-sm">
                    Lucas M.
                  </span>
                </div>
                <span className="text-[12px] leading-none font-bold text-[#747878]">
                  8 Contributions
                </span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
