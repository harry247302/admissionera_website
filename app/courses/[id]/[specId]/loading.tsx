export default function SpecializationLoading() {
  return (
    <main id="main" className="bg-white" aria-busy="true" aria-label="Loading specialization">
      <section className="bg-gradient-to-br from-[#F7F5FF] via-white to-[#EFEAFF]">
        <div className="era-shell animate-pulse pb-24 pt-6">
          <div className="h-4 w-64 rounded bg-[#E4DBFF]" />
          <div className="mt-10 grid items-center gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              <div className="h-6 w-20 rounded-full bg-[#E4DBFF]" />
              <div className="h-12 w-4/5 rounded-xl bg-[#E4DBFF]" />
              <div className="h-4 w-full rounded bg-[#EFEAFF]" />
              <div className="h-4 w-3/4 rounded bg-[#EFEAFF]" />
              <div className="flex gap-3 pt-3">
                <div className="h-12 w-36 rounded-xl bg-[#D9CCFF]" />
                <div className="h-12 w-44 rounded-xl bg-[#EFEAFF]" />
              </div>
            </div>
            <div className="hidden h-64 rounded-3xl bg-[#EFEAFF] lg:block" />
          </div>
        </div>
      </section>
      <div className="era-shell -mt-12">
        <div className="h-24 animate-pulse rounded-2xl border border-[#ECE8FA] bg-white shadow-sm" />
      </div>
    </main>
  );
}
