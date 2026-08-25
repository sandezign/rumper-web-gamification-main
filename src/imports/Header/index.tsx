import svgPaths from "./svg-n4hssipkeg";

function Frame() {
  return (
    <div className="relative shrink-0 size-[30px]" data-name="Frame">
      <svg className="absolute block inset-0 size-full" fill="none" height="30" preserveAspectRatio="none" viewBox="0 0 30 30" width="30">
        <g clipPath="url(#clip0_0_12)" id="Frame">
          <g id="Vector" />
          <path d={svgPaths.p187fc900} id="Union" stroke="#00ED64" strokeWidth="2" />
          <path d={svgPaths.p38875b00} fill="#5085FF" id="Vector_2" />
        </g>
        <defs>
          <clipPath id="clip0_0_12">
            <rect fill="white" height="30" width="30" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="bg-[#001e2b] content-stretch flex items-center justify-center relative rounded-[12px] shrink-0 size-[36px]" data-name="Text">
      <Frame />
    </div>
  );
}

function Text() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Text">
      <Text1 />
      <p className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[25.2px] relative shrink-0 text-[18px] text-white whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Rumper
      </p>
    </div>
  );
}

function Text2() {
  return (
    <div className="bg-[rgba(1,237,100,0.1)] border border-[rgba(1,237,100,0.5)] border-solid content-stretch flex items-center px-[12px] py-[4px] relative rounded-[33554400px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[13px] relative shrink-0 text-[#00ed64] text-[13px] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Premium
      </p>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Text />
      <Text2 />
    </div>
  );
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d={svgPaths.p3d095780} id="Vector" stroke="#00ED64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p26d22700} id="Vector_2" stroke="#00ED64" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[18.2px] relative shrink-0 text-[13px] text-center text-white whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        Grand Galaxy City Blok R, Bekasi Selatan
      </p>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="Icon">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="#A8B3BC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] border-solid content-stretch flex gap-[8px] items-center px-[12px] py-[8px] relative rounded-[20px] shrink-0" data-name="Button">
      <Icon />
      <Text3 />
      <Icon1 />
    </div>
  );
}

function Text4() {
  return (
    <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] border-solid content-stretch flex flex-col items-center px-[12px] py-[8px] relative rounded-[20px] shrink-0" data-name="Text">
      <p className="[word-break:break-word] font-['DM_Sans:Regular',sans-serif] font-normal leading-[18px] relative shrink-0 text-[13px] text-[rgba(255,255,255,0.9)] whitespace-nowrap" style={{ fontVariationSettings: '"opsz" 14' }}>
        2 dari 5 lokasi digunakan
      </p>
    </div>
  );
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" height="20" preserveAspectRatio="none" viewBox="0 0 20 20" width="20">
        <g id="Icon">
          <path d={svgPaths.p32d71800} id="Vector" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p205a5680} id="Vector_2" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[rgba(255,255,255,0.1)] content-stretch flex items-center justify-center relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Button">
      <Icon2 />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-name="Container">
      <Button />
      <Text4 />
      <Button1 />
    </div>
  );
}

export default function Header() {
  return (
    <div className="bg-[#001e2b] border-[#e1e5e8] border-b border-solid content-stretch flex items-center justify-between px-[24px] relative size-full" data-name="Header">
      <Container />
      <Container1 />
    </div>
  );
}