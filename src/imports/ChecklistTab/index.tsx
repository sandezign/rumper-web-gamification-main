import svgPaths from "./svg-85db167afh"

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[16px] relative shrink-0 text-[#90a1b9] text-[12px] tracking-[1.44px] uppercase whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          Field Verification
        </p>
      </div>
    </div>
  )
}

function Container2() {
  return (
    <div
      className="[word-break:break-word] h-[35.99px] relative shrink-0 w-full whitespace-nowrap"
      data-name="Container"
    >
      <p className="absolute font-['DM_Mono:Medium',sans-serif] leading-[36px] left-0 not-italic text-[#0f172a] text-[30px] top-0">
        3
      </p>
      <p className="absolute font-['DM_Mono:Regular',sans-serif] leading-[28px] left-[22px] not-italic text-[#90a1b9] text-[18px] top-[7.78px]">
        / 7
      </p>
      <p
        className="absolute font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[20px] left-[66.37px] text-[#62748e] text-[14px] top-[14.45px]"
        style={{ fontVariationSettings: '"opsz" 9' }}
      >
        Verified
      </p>
    </div>
  )
}

function ContainerMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[4px] relative size-full">
        <Container2 />
      </div>
    </div>
  )
}

function Container1() {
  return (
    <div className="relative shrink-0 w-[140.503px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph />
        <ContainerMargin />
      </div>
    </div>
  )
}

function Container3() {
  return (
    <div
      className="bg-white relative rounded-[37282700px] shrink-0 size-[40px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="[word-break:break-word] font-['DM_Mono:Medium',sans-serif] leading-[16px] not-italic relative shrink-0 text-[#5085ff] text-[12px] whitespace-nowrap">
          43%
        </p>
      </div>
    </div>
  )
}

function Component43Complete() {
  return (
    <div
      className="relative rounded-[37282700px] shrink-0 size-[55.99px]"
      data-name="43% complete"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Container3 />
      </div>
    </div>
  )
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between relative size-full">
        <Container1 />
        <Component43Complete />
      </div>
    </div>
  )
}

function Container5() {
  return (
    <div
      className="bg-[#5085ff] h-[7.986px] relative rounded-[37282700px] shrink-0 w-[143.438px]"
      data-name="Container"
    />
  )
}

function Container4() {
  return (
    <div
      className="bg-[#f1f5f9] content-stretch flex flex-col h-[7.986px] items-start overflow-clip relative rounded-[37282700px] shrink-0 w-[333.576px]"
      data-name="Container"
    >
      <Container5 />
    </div>
  )
}

function ContainerMargin1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] relative size-full">
        <Container4 />
      </div>
    </div>
  )
}

function Paragraph1() {
  return (
    <div
      className="h-[24px] relative shrink-0 w-[333.576px]"
      data-name="Paragraph"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[8px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#90a1b9] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          4 items remaining · ordered by risk priority
        </p>
      </div>
    </div>
  )
}

function FieldVerificationProgress() {
  return (
    <div
      className="bg-white drop-shadow-[0px_4px_10px_rgba(15,23,42,0.07)] relative rounded-[20px] shrink-0 w-[373.576px]"
      data-name="Field verification progress"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start p-[20px] relative size-full">
        <Container />
        <ContainerMargin1 />
        <Paragraph1 />
      </div>
    </div>
  )
}

function CheckboxAskAtLeast3ResidentsAboutFloodHistoryInThePast5Years() {
  return (
    <div
      className="relative rounded-[37282700px] shrink-0 size-[20px]"
      data-name="Checkbox - Ask at least 3 residents about flood history in the past 5 years"
    >
      <div
        aria-hidden
        className="absolute border-[#cbd5e1] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[37282700px]"
      />
    </div>
  )
}

function CheckboxAskAtLeast3ResidentsAboutFloodHistoryInThePast5YearsMargin() {
  return (
    <div
      className="relative shrink-0"
      data-name="Checkbox - Ask at least 3 residents about flood history in the past 5 years:margin"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxAskAtLeast3ResidentsAboutFloodHistoryInThePast5Years />
      </div>
    </div>
  )
}

function Paragraph2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[19.25px] relative shrink-0 text-[#314158] text-[14px] w-[310px]"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          Ask at least 3 residents about flood history in the past 5 years
        </p>
      </div>
    </div>
  )
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[10.99px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="10.9896"
        preserveAspectRatio="none"
        viewBox="0 0 10.9896 10.9896"
        width="10.9896"
      >
        <g clipPath="url(#clip0_0_32)" id="Icon">
          <path
            d={svgPaths.p31f44600}
            id="Vector"
            stroke="#EF4444"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d={svgPaths.p1a2adc0}
            id="Vector_2"
            stroke="#EF4444"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_32">
            <rect fill="white" height="10.9896" width="10.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#ef4444] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          Flood
        </p>
      </div>
    </div>
  )
}

function Container9() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon />
        <Text />
      </div>
    </div>
  )
}

function Text1() {
  return (
    <div
      className="bg-[#fef2f2] relative rounded-[37282700px] shrink-0"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[6px] py-[2px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#ef4444] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          High Priority
        </p>
      </div>
    </div>
  )
}

function Container8() {
  return (
    <div
      className="h-[26px] relative shrink-0 w-[309.576px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pt-[6px] relative size-full">
        <Container9 />
        <Text1 />
      </div>
    </div>
  )
}

function Paragraph3() {
  return (
    <div
      className="h-[26px] relative shrink-0 w-[309.576px]"
      data-name="Paragraph"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[6px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[#62748e] text-[0px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          <span className="leading-[19.5px] text-[12px]">{`Tip: `}</span>
          <span
            className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[19.5px] text-[#90a1b9] text-[12px]"
            style={{ fontVariationSettings: '"opsz" 9' }}
          >
            Ask specifically about Feb 2024 and Jan 2020.
          </span>
        </p>
      </div>
    </div>
  )
}

function Container7() {
  return (
    <div className="flex-[309.601_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph2 />
        <Container8 />
        <Paragraph3 />
      </div>
    </div>
  )
}

function Container6() {
  return (
    <div className="relative shrink-0 w-[373.576px]" data-name="Container">
      <div
        aria-hidden
        className="absolute border-[#f8fafc] border-b-[1.111px] border-solid inset-0 pointer-events-none"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start pb-[17.111px] pt-[16px] px-[16px] relative size-full">
        <CheckboxAskAtLeast3ResidentsAboutFloodHistoryInThePast5YearsMargin />
        <Container7 />
      </div>
    </div>
  )
}

function CheckboxInspectDrainageChannelsAndGuttersAfterAHeavyRainEvent() {
  return (
    <div
      className="relative rounded-[37282700px] shrink-0 size-[20px]"
      data-name="Checkbox - Inspect drainage channels and gutters after a heavy rain event"
    >
      <div
        aria-hidden
        className="absolute border-[#cbd5e1] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[37282700px]"
      />
    </div>
  )
}

function CheckboxInspectDrainageChannelsAndGuttersAfterAHeavyRainEventMargin() {
  return (
    <div
      className="relative shrink-0"
      data-name="Checkbox - Inspect drainage channels and gutters after a heavy rain event:margin"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxInspectDrainageChannelsAndGuttersAfterAHeavyRainEvent />
      </div>
    </div>
  )
}

function Paragraph4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[19.25px] relative shrink-0 text-[#314158] text-[14px] w-[310px]"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          Inspect drainage channels and gutters after a heavy rain event
        </p>
      </div>
    </div>
  )
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[10.99px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="10.9896"
        preserveAspectRatio="none"
        viewBox="0 0 10.9896 10.9896"
        width="10.9896"
      >
        <g clipPath="url(#clip0_0_32)" id="Icon">
          <path
            d={svgPaths.p31f44600}
            id="Vector"
            stroke="#EF4444"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d={svgPaths.p1a2adc0}
            id="Vector_2"
            stroke="#EF4444"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_32">
            <rect fill="white" height="10.9896" width="10.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

function Text2() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#ef4444] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          Flood
        </p>
      </div>
    </div>
  )
}

function Container13() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon1 />
        <Text2 />
      </div>
    </div>
  )
}

function Text3() {
  return (
    <div
      className="bg-[#fef2f2] relative rounded-[37282700px] shrink-0"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[6px] py-[2px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#ef4444] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          High Priority
        </p>
      </div>
    </div>
  )
}

function Container12() {
  return (
    <div
      className="h-[26px] relative shrink-0 w-[309.576px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pt-[6px] relative size-full">
        <Container13 />
        <Text3 />
      </div>
    </div>
  )
}

function Paragraph5() {
  return (
    <div
      className="h-[26px] relative shrink-0 w-[309.576px]"
      data-name="Paragraph"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[6px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[#62748e] text-[0px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          <span className="leading-[19.5px] text-[12px]">{`Tip: `}</span>
          <span
            className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[19.5px] text-[#90a1b9] text-[12px]"
            style={{ fontVariationSettings: '"opsz" 9' }}
          >
            Visit within 24h of rainfall if possible.
          </span>
        </p>
      </div>
    </div>
  )
}

function Container11() {
  return (
    <div className="flex-[309.601_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph4 />
        <Container12 />
        <Paragraph5 />
      </div>
    </div>
  )
}

function Container10() {
  return (
    <div className="relative shrink-0 w-[373.576px]" data-name="Container">
      <div
        aria-hidden
        className="absolute border-[#f8fafc] border-b-[1.111px] border-solid inset-0 pointer-events-none"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start pb-[17.111px] pt-[16px] px-[16px] relative size-full">
        <CheckboxInspectDrainageChannelsAndGuttersAfterAHeavyRainEventMargin />
        <Container11 />
      </div>
    </div>
  )
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="10"
        preserveAspectRatio="none"
        viewBox="0 0 10 10"
        width="10"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1098da98}
            id="Vector"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.833333"
          />
        </g>
      </svg>
    </div>
  )
}

function CheckboxVisitThePropertyDuringPeakCommuteHours() {
  return (
    <div
      className="bg-[#5085ff] content-stretch flex items-center justify-center p-[1.111px] relative rounded-[37282700px] shrink-0 size-[20px]"
      data-name="Checkbox - Visit the property during peak commute hours (07:00–09:00)"
    >
      <div
        aria-hidden
        className="absolute border-[#5085ff] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[37282700px]"
      />
      <Icon2 />
    </div>
  )
}

function CheckboxVisitThePropertyDuringPeakCommuteHours07000900Margin() {
  return (
    <div
      className="relative shrink-0"
      data-name="Checkbox - Visit the property during peak commute hours (07:00–09:00):margin"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxVisitThePropertyDuringPeakCommuteHours />
      </div>
    </div>
  )
}

function Paragraph6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[text-decoration-skip-ink:none] [text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[19.25px] line-through relative shrink-0 text-[#314158] text-[14px] w-[310px]"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          Visit the property during peak commute hours (07:00–09:00)
        </p>
      </div>
    </div>
  )
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[10.99px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="10.9896"
        preserveAspectRatio="none"
        viewBox="0 0 10.9896 10.9896"
        width="10.9896"
      >
        <g clipPath="url(#clip0_0_20)" id="Icon">
          <path
            d={svgPaths.p2efe1d00}
            id="Vector"
            stroke="#F59E0B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d="M1.8316 5.0369H9.158"
            id="Vector_2"
            stroke="#F59E0B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d="M5.49487 1.37305V5.03625"
            id="Vector_3"
            stroke="#F59E0B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d={svgPaths.p3b3def80}
            id="Vector_4"
            stroke="#F59E0B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d={svgPaths.p2e24dac0}
            id="Vector_5"
            stroke="#F59E0B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d="M3.66309 6.86914H3.66767"
            id="Vector_6"
            stroke="#F59E0B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d="M7.32642 6.86914H7.331"
            id="Vector_7"
            stroke="#F59E0B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_20">
            <rect fill="white" height="10.9896" width="10.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

function Text4() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#f59e0b] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          Commute
        </p>
      </div>
    </div>
  )
}

function Container17() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon3 />
        <Text4 />
      </div>
    </div>
  )
}

function Text5() {
  return (
    <div
      className="bg-[#fffbeb] relative rounded-[37282700px] shrink-0"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[6px] py-[2px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#f59e0b] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          Medium
        </p>
      </div>
    </div>
  )
}

function Container16() {
  return (
    <div
      className="h-[26px] relative shrink-0 w-[309.576px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pt-[6px] relative size-full">
        <Container17 />
        <Text5 />
      </div>
    </div>
  )
}

function Container15() {
  return (
    <div className="flex-[309.601_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph6 />
        <Container16 />
      </div>
    </div>
  )
}

function Container14() {
  return (
    <div
      className="opacity-50 relative shrink-0 w-[373.576px]"
      data-name="Container"
    >
      <div
        aria-hidden
        className="absolute border-[#f8fafc] border-b-[1.111px] border-solid inset-0 pointer-events-none"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start pb-[17.111px] pt-[16px] px-[16px] relative size-full">
        <CheckboxVisitThePropertyDuringPeakCommuteHours07000900Margin />
        <Container15 />
      </div>
    </div>
  )
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="10"
        preserveAspectRatio="none"
        viewBox="0 0 10 10"
        width="10"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1098da98}
            id="Vector"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.833333"
          />
        </g>
      </svg>
    </div>
  )
}

function CheckboxTestAll3RoadAccessRoutesIncludingTheSecondaryLane() {
  return (
    <div
      className="bg-[#5085ff] content-stretch flex items-center justify-center p-[1.111px] relative rounded-[37282700px] shrink-0 size-[20px]"
      data-name="Checkbox - Test all 3 road access routes including the secondary lane"
    >
      <div
        aria-hidden
        className="absolute border-[#5085ff] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[37282700px]"
      />
      <Icon4 />
    </div>
  )
}

function CheckboxTestAll3RoadAccessRoutesIncludingTheSecondaryLaneMargin() {
  return (
    <div
      className="relative shrink-0"
      data-name="Checkbox - Test all 3 road access routes including the secondary lane:margin"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxTestAll3RoadAccessRoutesIncludingTheSecondaryLane />
      </div>
    </div>
  )
}

function Paragraph7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[text-decoration-skip-ink:none] [text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[19.25px] line-through relative shrink-0 text-[#314158] text-[14px] w-[310px]"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          Test all 3 road access routes including the secondary lane
        </p>
      </div>
    </div>
  )
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[10.99px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="10.9896"
        preserveAspectRatio="none"
        viewBox="0 0 10.9896 10.9896"
        width="10.9896"
      >
        <g clipPath="url(#clip0_0_15)" id="Icon">
          <path
            d={svgPaths.p3f8c98a0}
            id="Vector"
            stroke="#F59E0B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d={svgPaths.p37fe3500}
            id="Vector_2"
            stroke="#F59E0B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d="M4.12109 7.78516H6.86849"
            id="Vector_3"
            stroke="#F59E0B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d={svgPaths.p285e8900}
            id="Vector_4"
            stroke="#F59E0B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_15">
            <rect fill="white" height="10.9896" width="10.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

function Text6() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#f59e0b] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          Access
        </p>
      </div>
    </div>
  )
}

function Container21() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon5 />
        <Text6 />
      </div>
    </div>
  )
}

function Text7() {
  return (
    <div
      className="bg-[#fffbeb] relative rounded-[37282700px] shrink-0"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[6px] py-[2px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#f59e0b] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          Medium
        </p>
      </div>
    </div>
  )
}

function Container20() {
  return (
    <div
      className="h-[26px] relative shrink-0 w-[309.576px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pt-[6px] relative size-full">
        <Container21 />
        <Text7 />
      </div>
    </div>
  )
}

function Container19() {
  return (
    <div className="flex-[309.601_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph7 />
        <Container20 />
      </div>
    </div>
  )
}

function Container18() {
  return (
    <div
      className="opacity-50 relative shrink-0 w-[373.576px]"
      data-name="Container"
    >
      <div
        aria-hidden
        className="absolute border-[#f8fafc] border-b-[1.111px] border-solid inset-0 pointer-events-none"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start pb-[17.111px] pt-[16px] px-[16px] relative size-full">
        <CheckboxTestAll3RoadAccessRoutesIncludingTheSecondaryLaneMargin />
        <Container19 />
      </div>
    </div>
  )
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="10"
        preserveAspectRatio="none"
        viewBox="0 0 10 10"
        width="10"
      >
        <g id="Icon">
          <path
            d={svgPaths.p1098da98}
            id="Vector"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.833333"
          />
        </g>
      </svg>
    </div>
  )
}

function CheckboxCheckIfAlternativeRoutesExistDuringPeakHourRoadClosures() {
  return (
    <div
      className="bg-[#5085ff] content-stretch flex items-center justify-center p-[1.111px] relative rounded-[37282700px] shrink-0 size-[20px]"
      data-name="Checkbox - Check if alternative routes exist during peak-hour road closures"
    >
      <div
        aria-hidden
        className="absolute border-[#5085ff] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[37282700px]"
      />
      <Icon6 />
    </div>
  )
}

function CheckboxCheckIfAlternativeRoutesExistDuringPeakHourRoadClosuresMargin() {
  return (
    <div
      className="relative shrink-0"
      data-name="Checkbox - Check if alternative routes exist during peak-hour road closures:margin"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxCheckIfAlternativeRoutesExistDuringPeakHourRoadClosures />
      </div>
    </div>
  )
}

function Paragraph8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[text-decoration-skip-ink:none] [text-underline-position:from-font] [word-break:break-word] decoration-from-font decoration-solid font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[19.25px] line-through relative shrink-0 text-[#314158] text-[14px] w-[310px]"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          Check if alternative routes exist during peak-hour road closures
        </p>
      </div>
    </div>
  )
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[10.99px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="10.9896"
        preserveAspectRatio="none"
        viewBox="0 0 10.9896 10.9896"
        width="10.9896"
      >
        <g clipPath="url(#clip0_0_30)" id="Icon">
          <path
            d={svgPaths.p3fc6b980}
            id="Vector"
            stroke="#F59E0B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_30">
            <rect fill="white" height="10.9896" width="10.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

function Text8() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#f59e0b] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          Access
        </p>
      </div>
    </div>
  )
}

function Container25() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon7 />
        <Text8 />
      </div>
    </div>
  )
}

function Text9() {
  return (
    <div
      className="bg-[#fffbeb] relative rounded-[37282700px] shrink-0"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[6px] py-[2px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#f59e0b] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          Medium
        </p>
      </div>
    </div>
  )
}

function Container24() {
  return (
    <div
      className="h-[26px] relative shrink-0 w-[309.576px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pt-[6px] relative size-full">
        <Container25 />
        <Text9 />
      </div>
    </div>
  )
}

function Container23() {
  return (
    <div className="flex-[309.601_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph8 />
        <Container24 />
      </div>
    </div>
  )
}

function Container22() {
  return (
    <div
      className="opacity-50 relative shrink-0 w-[373.576px]"
      data-name="Container"
    >
      <div
        aria-hidden
        className="absolute border-[#f8fafc] border-b-[1.111px] border-solid inset-0 pointer-events-none"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start pb-[17.111px] pt-[16px] px-[16px] relative size-full">
        <CheckboxCheckIfAlternativeRoutesExistDuringPeakHourRoadClosuresMargin />
        <Container23 />
      </div>
    </div>
  )
}

function CheckboxVisitAtNightToAssessNoiseLevelsFromTheNearbyIndustrialArea() {
  return (
    <div
      className="relative rounded-[37282700px] shrink-0 size-[20px]"
      data-name="Checkbox - Visit at night to assess noise levels from the nearby industrial area"
    >
      <div
        aria-hidden
        className="absolute border-[#cbd5e1] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[37282700px]"
      />
    </div>
  )
}

function CheckboxVisitAtNightToAssessNoiseLevelsFromTheNearbyIndustrialAreaMargin() {
  return (
    <div
      className="relative shrink-0"
      data-name="Checkbox - Visit at night to assess noise levels from the nearby industrial area:margin"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxVisitAtNightToAssessNoiseLevelsFromTheNearbyIndustrialArea />
      </div>
    </div>
  )
}

function Paragraph9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[19.25px] relative shrink-0 text-[#314158] text-[14px] w-[310px]"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          Visit at night to assess noise levels from the nearby industrial area
        </p>
      </div>
    </div>
  )
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[10.99px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="10.9896"
        preserveAspectRatio="none"
        viewBox="0 0 10.9896 10.9896"
        width="10.9896"
      >
        <g clipPath="url(#clip0_0_4)" id="Icon">
          <path
            d={svgPaths.p19c95680}
            id="Vector"
            stroke="#64748B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d={svgPaths.p171d3d80}
            id="Vector_2"
            stroke="#64748B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_4">
            <rect fill="white" height="10.9896" width="10.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

function Text10() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          Environment
        </p>
      </div>
    </div>
  )
}

function Container29() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon8 />
        <Text10 />
      </div>
    </div>
  )
}

function Text11() {
  return (
    <div
      className="bg-[#f8fafc] relative rounded-[37282700px] shrink-0"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[6px] py-[2px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          Low
        </p>
      </div>
    </div>
  )
}

function Container28() {
  return (
    <div
      className="h-[26px] relative shrink-0 w-[309.576px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pt-[6px] relative size-full">
        <Container29 />
        <Text11 />
      </div>
    </div>
  )
}

function Paragraph10() {
  return (
    <div className="relative shrink-0 w-[309.576px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[6px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[#62748e] text-[0px] w-[310px]"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          <span className="leading-[19.5px] text-[12px]">{`Tip: `}</span>
          <span
            className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[19.5px] text-[#90a1b9] text-[12px]"
            style={{ fontVariationSettings: '"opsz" 9' }}
          >
            Weekday 21:00–23:00 is typically the quietest window.
          </span>
        </p>
      </div>
    </div>
  )
}

function Container27() {
  return (
    <div className="flex-[309.601_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph9 />
        <Container28 />
        <Paragraph10 />
      </div>
    </div>
  )
}

function Container26() {
  return (
    <div className="relative shrink-0 w-[373.576px]" data-name="Container">
      <div
        aria-hidden
        className="absolute border-[#f8fafc] border-b-[1.111px] border-solid inset-0 pointer-events-none"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start pb-[17.111px] pt-[16px] px-[16px] relative size-full">
        <CheckboxVisitAtNightToAssessNoiseLevelsFromTheNearbyIndustrialAreaMargin />
        <Container27 />
      </div>
    </div>
  )
}

function CheckboxVerifyWaterSupplySourceAndPdamReliabilityWithTheDeveloper() {
  return (
    <div
      className="relative rounded-[37282700px] shrink-0 size-[20px]"
      data-name="Checkbox - Verify water supply source and PDAM reliability with the developer"
    >
      <div
        aria-hidden
        className="absolute border-[#cbd5e1] border-[1.111px] border-solid inset-0 pointer-events-none rounded-[37282700px]"
      />
    </div>
  )
}

function CheckboxVerifyWaterSupplySourceAndPdamReliabilityWithTheDeveloperMargin() {
  return (
    <div
      className="relative shrink-0"
      data-name="Checkbox - Verify water supply source and PDAM reliability with the developer:margin"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start pt-[2px] relative size-full">
        <CheckboxVerifyWaterSupplySourceAndPdamReliabilityWithTheDeveloper />
      </div>
    </div>
  )
}

function Paragraph11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[19.25px] relative shrink-0 text-[#314158] text-[14px] w-[310px]"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          Verify water supply source and PDAM reliability with the developer
        </p>
      </div>
    </div>
  )
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[10.99px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="10.9896"
        preserveAspectRatio="none"
        viewBox="0 0 10.9896 10.9896"
        width="10.9896"
      >
        <g clipPath="url(#clip0_0_7)" id="Icon">
          <path
            d={svgPaths.p109e9000}
            id="Vector"
            stroke="#64748B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d={svgPaths.p344ef2be}
            id="Vector_2"
            stroke="#64748B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d={svgPaths.p31573500}
            id="Vector_3"
            stroke="#64748B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d="M4.5791 2.74805H6.4107"
            id="Vector_4"
            stroke="#64748B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d="M4.5791 4.57812H6.4107"
            id="Vector_5"
            stroke="#64748B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d="M4.5791 6.41016H6.4107"
            id="Vector_6"
            stroke="#64748B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
          <path
            d="M4.579 8.2422H6.4106"
            id="Vector_7"
            stroke="#64748B"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.9158"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_7">
            <rect fill="white" height="10.9896" width="10.9896" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

function Text12() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[16px] relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          Utilities
        </p>
      </div>
    </div>
  )
}

function Container33() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[4px] items-center relative size-full">
        <Icon9 />
        <Text12 />
      </div>
    </div>
  )
}

function Text13() {
  return (
    <div
      className="bg-[#f8fafc] relative rounded-[37282700px] shrink-0"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[6px] py-[2px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[16px] relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          Low
        </p>
      </div>
    </div>
  )
}

function Container32() {
  return (
    <div
      className="h-[26px] relative shrink-0 w-[309.576px]"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pt-[6px] relative size-full">
        <Container33 />
        <Text13 />
      </div>
    </div>
  )
}

function Paragraph12() {
  return (
    <div
      className="h-[26px] relative shrink-0 w-[309.576px]"
      data-name="Paragraph"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[6px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Medium',sans-serif] font-medium leading-[0] relative shrink-0 text-[#62748e] text-[0px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          <span className="leading-[19.5px] text-[12px]">{`Tip: `}</span>
          <span
            className="font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[19.5px] text-[#90a1b9] text-[12px]"
            style={{ fontVariationSettings: '"opsz" 9' }}
          >
            Ask for the last 6-month supply record.
          </span>
        </p>
      </div>
    </div>
  )
}

function Container31() {
  return (
    <div className="flex-[309.601_0_0] min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Paragraph11 />
        <Container32 />
        <Paragraph12 />
      </div>
    </div>
  )
}

function Container30() {
  return (
    <div className="relative shrink-0 w-[373.576px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-start p-[16px] relative size-full">
        <CheckboxVerifyWaterSupplySourceAndPdamReliabilityWithTheDeveloperMargin />
        <Container31 />
      </div>
    </div>
  )
}

function FieldVerificationChecklist() {
  return (
    <div
      className="bg-white content-stretch flex flex-col h-[802.986px] items-start overflow-clip relative rounded-[20px] shadow-[0px_4px_20px_0px_rgba(15,23,42,0.07)] shrink-0 w-[373.576px]"
      data-name="Field verification checklist"
    >
      <Container6 />
      <Container10 />
      <Container14 />
      <Container18 />
      <Container22 />
      <Container26 />
      <Container30 />
    </div>
  )
}

function FieldVerificationChecklistMargin() {
  return (
    <div
      className="relative shrink-0"
      data-name="Field verification checklist:margin"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[12px] relative size-full">
        <FieldVerificationChecklist />
      </div>
    </div>
  )
}

export default function ChecklistTab() {
  return (
    <div
      className="content-stretch flex flex-col items-start pb-[16px] px-[16px] relative size-full"
      data-name="ChecklistTab"
    >
      <FieldVerificationProgress />
      <FieldVerificationChecklistMargin />
    </div>
  )
}
