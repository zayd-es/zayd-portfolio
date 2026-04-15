"use client";

const ToolsMarquee = ({ tools = [] }) => {
  if (!tools?.length) return null;

  const content = [...tools, ...tools, ...tools];

  return (
    <div className="mt-10 w-full flex flex-col items-center overflow-hidden">
      <h3 className=" text-xl font-ovo px-6 text-slate-900 dark:text-white w-full max-w-6xl">
        Tools I use
      </h3>

      <div className="marquee-container w-screen md:max-w-7xl mx-auto">
        <div className="marquee-content gap-4 md:gap-8 my-10 px-4">
          {content.map((tool, index) => {
            const Icon = tool.Icon;
            return (
              <div
                key={index}
                style={{ "--hover-color": tool.color }}
                className="tool-card group relative flex shrink-0 items-center gap-3 md:gap-4 rounded-xl md:rounded-2xl border border-gray-200 bg-white/10 px-5 py-3 md:px-7 md:py-4 dark:border-white/10 dark:bg-[#1a1625]/60 backdrop-blur-md cursor-pointer transition-all duration-500"
              >
                <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-[35px] rounded-full bg-[var(--hover-color)]/20" />

                <div
                  className={`relative text-2xl md:text-3xl transition-all duration-500 group-hover:scale-125
                  ${
                    tool.name === "Next.js"
                      ? "dark:text-white text-black"
                      : "text-slate-700 dark:text-white/80"
                  } 
                  group-hover:text-[var(--hover-color)] 
                  group-hover:drop-shadow-[0_0_15px_var(--hover-color)]`}
                >
                  <Icon />
                </div>

                <span className="relative text-sm md:text-base font-semibold text-slate-800 dark:text-white/90 group-hover:text-black dark:group-hover:text-white transition-colors duration-500">
                  {tool.name}
                </span>

                <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-[var(--hover-color)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ToolsMarquee;
