import React from "react";

export function SkeletonPulse({ className }: { className?: string }) {
  return <div className={`animate-pulse bg-slate-800 rounded-xl ${className || ""}`} />;
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Skeleton */}
      <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row justify-between gap-4">
        <div className="space-y-3 flex-1">
          <SkeletonPulse className="h-5 w-40" />
          <SkeletonPulse className="h-8 w-64" />
          <SkeletonPulse className="h-4 w-96" />
        </div>
        <div className="w-64 h-16 bg-slate-950/60 p-4 rounded-2xl border border-slate-800 flex gap-4">
          <SkeletonPulse className="h-full flex-1" />
          <SkeletonPulse className="h-full flex-1" />
        </div>
      </div>

      {/* Grid Content Skeletons */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <SkeletonPulse className="h-6 w-32" />
          <SkeletonPulse className="h-36 w-36 rounded-full mx-auto" />
          <SkeletonPulse className="h-10 w-full" />
        </div>
        <div className="md:col-span-5 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <SkeletonPulse className="h-6 w-40" />
          <div className="space-y-3">
            <SkeletonPulse className="h-14 w-full" />
            <SkeletonPulse className="h-14 w-full" />
            <SkeletonPulse className="h-14 w-full" />
          </div>
        </div>
        <div className="md:col-span-3 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <SkeletonPulse className="h-6 w-32" />
          <div className="space-y-3">
            <SkeletonPulse className="h-12 w-full" />
            <SkeletonPulse className="h-12 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TutorChatSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex gap-3 max-w-[80%]">
        <SkeletonPulse className="w-8 h-8 rounded-xl flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <SkeletonPulse className="h-12 w-full" />
          <SkeletonPulse className="h-20 w-3/4" />
        </div>
      </div>
      <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
        <SkeletonPulse className="w-8 h-8 rounded-xl flex-shrink-0" />
        <SkeletonPulse className="h-10 w-64" />
      </div>
      <div className="flex gap-3 max-w-[80%]">
        <SkeletonPulse className="w-8 h-8 rounded-xl flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <SkeletonPulse className="h-12 w-1/2" />
          <SkeletonPulse className="h-16 w-5/6" />
        </div>
      </div>
    </div>
  );
}

export function ExamEngineSkeleton() {
  return (
    <div className="space-y-6">
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-4">
        <SkeletonPulse className="h-4 w-32" />
        <SkeletonPulse className="h-8 w-1/2" />
        <SkeletonPulse className="h-4 w-2/3" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <SkeletonPulse className="h-16 w-full" />
          <div className="space-y-3">
            <SkeletonPulse className="h-12 w-full" />
            <SkeletonPulse className="h-12 w-full" />
            <SkeletonPulse className="h-12 w-full" />
            <SkeletonPulse className="h-12 w-full" />
          </div>
        </div>
        <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <SkeletonPulse className="h-6 w-32" />
          <SkeletonPulse className="h-24 w-full" />
          <SkeletonPulse className="h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
