export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[350] h-[3px] pointer-events-none">
      <div className="h-full w-1/3 bg-gradient-to-l from-primary-blue to-primary-shade1 nav-loading-bar" />
    </div>
  );
}
