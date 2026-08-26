import svgPaths from "./svg-uizybifeh6"

function Paragraph() {
  return (
    <div className="relative shrink-0 w-full" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start px-[8px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:9pt_Regular',sans-serif] font-normal leading-[26px] relative shrink-0 text-[#3d4f5b] text-[16px] w-[424px]"
          style={{ fontVariationSettings: '"opsz" 9' }}
        >
          8 fasilitas dalam radius ±3 km. Aktifkan layer peta lewat sakelar;
          klik baris untuk rincian.
        </p>
      </div>
    </div>
  )
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="18"
        preserveAspectRatio="none"
        viewBox="0 0 18 18"
        width="18"
      >
        <g id="Icon">
          <path
            d={svgPaths.p36149d00}
            id="Vector"
            stroke="#1E1E1E"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d={svgPaths.p37de9020}
            id="Vector_2"
            stroke="#1E1E1E"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  )
}

function Container3() {
  return (
    <div
      className="bg-[#001e2b] drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] relative rounded-[16px] shrink-0 size-[36px]"
      data-name="Container"
    >
      <div
        aria-hidden
        className="absolute border border-[#001e2b] border-solid inset-0 pointer-events-none rounded-[16px]"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon />
      </div>
    </div>
  )
}

function Text() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[21px] relative shrink-0 text-[#001e2b] text-[14px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          Kesehatan
        </p>
      </div>
    </div>
  )
}

function Text1() {
  return (
    <div
      className="bg-[#e0e7ff] relative rounded-[8px] shrink-0"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[16.5px] relative shrink-0 text-[#432dd7] text-[11px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          3
        </p>
      </div>
    </div>
  )
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Text />
        <Text1 />
      </div>
    </div>
  )
}

function Text2() {
  return (
    <div className="h-[19px] relative shrink-0 w-[254px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[0] relative shrink-0 text-[#096] text-[0px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          <span className="leading-[16.5px] text-[11px]">Sangat Dekat</span>
          <span
            className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[16.5px] text-[#5c6c7a] text-[11px]"
            style={{ fontVariationSettings: '"opsz" 14' }}
          >{` · terdekat 0.19 km`}</span>
        </p>
      </div>
    </div>
  )
}

function Container4() {
  return (
    <div
      className="flex-[258_0_0] h-[40px] min-w-px relative"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[4px] relative size-full">
        <Container5 />
        <Text2 />
      </div>
    </div>
  )
}

function Button() {
  return (
    <div
      className="flex-[326_0_0] min-h-[44px] min-w-px relative"
      data-name="Button"
    >
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center min-h-[inherit] pl-[16px] pr-[8px] py-[16px] relative size-full">
          <Container3 />
          <Container4 />
        </div>
      </div>
    </div>
  )
}

function Text4() {
  return (
    <div
      className="absolute bg-[#1e1e1e] left-[2px] rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] size-[16px] top-[2px]"
      data-name="Text"
    />
  )
}

function TextTransform() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text:transform">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Text4 />
      </div>
    </div>
  )
}

function Text3() {
  return (
    <div
      className="bg-[#e2e8f0] h-[20px] relative rounded-[33554400px] shrink-0 w-[36px]"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <TextTransform />
      </div>
    </div>
  )
}

function SwitchTampilkanDiPetaKesehatan() {
  return (
    <div
      className="relative rounded-[12px] shrink-0 size-[44px]"
      data-name="Switch - Tampilkan di peta: Kesehatan"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text3 />
      </div>
    </div>
  )
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="16"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
        width="16"
      >
        <g id="Icon">
          <path
            d="M4 6L8 10L12 6"
            id="Vector"
            stroke="#5C6C7A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
        </g>
      </svg>
    </div>
  )
}

function ButtonSembunyikanKesehatan() {
  return (
    <div
      className="relative rounded-[12px] shrink-0 size-[44px]"
      data-name="Button - Sembunyikan Kesehatan"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  )
}

function Container6() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pr-[16px] relative size-full">
        <SwitchTampilkanDiPetaKesehatan />
        <ButtonSembunyikanKesehatan />
      </div>
    </div>
  )
}

function Container2() {
  return (
    <div className="relative shrink-0 w-[438px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button />
        <Container6 />
      </div>
    </div>
  )
}

function Text5() {
  return (
    <div className="h-[24px] relative shrink-0 w-[174.844px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[8px] relative rounded-[inherit] size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#001e2b] text-[16px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          Klinik Pratama Galaxy
        </p>
      </div>
    </div>
  )
}

function Text6() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#3d4f5b] text-[16px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          0.19 km
        </p>
      </div>
    </div>
  )
}

function Container8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div
        aria-hidden
        className="absolute border-[rgba(225,229,232,0.3)] border-b border-solid inset-0 pointer-events-none"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[9px] pt-[8px] relative size-full">
        <Text5 />
        <Text6 />
      </div>
    </div>
  )
}

function Text7() {
  return (
    <div className="h-[24px] relative shrink-0 w-[161.953px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[8px] relative rounded-[inherit] size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#001e2b] text-[16px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          Apotek K-24 Galaxy
        </p>
      </div>
    </div>
  )
}

function Text8() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#3d4f5b] text-[16px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          0.22 km
        </p>
      </div>
    </div>
  )
}

function Container9() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div
        aria-hidden
        className="absolute border-[rgba(225,229,232,0.3)] border-b border-solid inset-0 pointer-events-none"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between pb-[9px] pt-[8px] relative size-full">
        <Text7 />
        <Text8 />
      </div>
    </div>
  )
}

function Text9() {
  return (
    <div className="h-[24px] relative shrink-0 w-[153.156px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip pr-[8px] relative rounded-[inherit] size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#001e2b] text-[16px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          RS Hermina Galaxy
        </p>
      </div>
    </div>
  )
}

function Text10() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[24px] relative shrink-0 text-[#3d4f5b] text-[16px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          0.48 km
        </p>
      </div>
    </div>
  )
}

function Container10() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between py-[8px] relative size-full">
        <Text9 />
        <Text10 />
      </div>
    </div>
  )
}

function Container7() {
  return (
    <div
      className="bg-[rgba(248,250,252,0.5)] relative shrink-0 w-full"
      data-name="Container"
    >
      <div
        aria-hidden
        className="absolute border-[rgba(225,229,232,0.4)] border-solid border-t inset-0 pointer-events-none"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start pb-[12px] pt-[13px] px-[20px] relative size-full">
        <Container8 />
        <Container9 />
        <Container10 />
      </div>
    </div>
  )
}

function Container1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container2 />
        <Container7 />
      </div>
    </div>
  )
}

function Icon2() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="18"
        preserveAspectRatio="none"
        viewBox="0 0 18 18"
        width="18"
      >
        <g id="Icon">
          <path
            d={svgPaths.p3c7a6100}
            id="Vector"
            stroke="#615FFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M16.5 7.5V12"
            id="Vector_2"
            stroke="#615FFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d={svgPaths.p33836100}
            id="Vector_3"
            stroke="#615FFF"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  )
}

function Container13() {
  return (
    <div
      className="bg-[#eef2ff] relative rounded-[16px] shrink-0 size-[36px]"
      data-name="Container"
    >
      <div
        aria-hidden
        className="absolute border border-[rgba(198,210,255,0.6)] border-solid inset-0 pointer-events-none rounded-[16px]"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon2 />
      </div>
    </div>
  )
}

function Text11() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[21px] relative shrink-0 text-[#001e2b] text-[14px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          Pendidikan
        </p>
      </div>
    </div>
  )
}

function Text12() {
  return (
    <div
      className="bg-[#e0e7ff] relative rounded-[8px] shrink-0"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[16.5px] relative shrink-0 text-[#432dd7] text-[11px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          1
        </p>
      </div>
    </div>
  )
}

function Container15() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Text11 />
        <Text12 />
      </div>
    </div>
  )
}

function Text13() {
  return (
    <div className="h-[19px] relative shrink-0 w-[254px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[0] relative shrink-0 text-[#e17100] text-[0px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          <span className="leading-[16.5px] text-[11px]">Cukup Jauh</span>
          <span
            className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[16.5px] text-[#5c6c7a] text-[11px]"
            style={{ fontVariationSettings: '"opsz" 14' }}
          >{` · terdekat 1.62 km`}</span>
        </p>
      </div>
    </div>
  )
}

function Container14() {
  return (
    <div
      className="flex-[258_0_0] h-[40px] min-w-px relative"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[4px] relative size-full">
        <Container15 />
        <Text13 />
      </div>
    </div>
  )
}

function Button1() {
  return (
    <div
      className="flex-[326_0_0] min-h-[44px] min-w-px relative"
      data-name="Button"
    >
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center min-h-[inherit] pl-[16px] pr-[8px] py-[16px] relative size-full">
          <Container13 />
          <Container14 />
        </div>
      </div>
    </div>
  )
}

function Text15() {
  return (
    <div
      className="absolute bg-[#1e1e1e] left-[2px] rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] size-[16px] top-[2px]"
      data-name="Text"
    />
  )
}

function TextTransform1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text:transform">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Text15 />
      </div>
    </div>
  )
}

function Text14() {
  return (
    <div
      className="bg-[#e2e8f0] h-[20px] relative rounded-[33554400px] shrink-0 w-[36px]"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <TextTransform1 />
      </div>
    </div>
  )
}

function SwitchTampilkanDiPetaPendidikan() {
  return (
    <div
      className="relative rounded-[12px] shrink-0 size-[44px]"
      data-name="Switch - Tampilkan di peta: Pendidikan"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text14 />
      </div>
    </div>
  )
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="16"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
        width="16"
      >
        <g id="Icon">
          <path
            d="M6 12L10 8L6 4"
            id="Vector"
            stroke="#5C6C7A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
        </g>
      </svg>
    </div>
  )
}

function ButtonTampilkanPendidikan() {
  return (
    <div
      className="relative rounded-[12px] shrink-0 size-[44px]"
      data-name="Button - Tampilkan Pendidikan"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon3 />
      </div>
    </div>
  )
}

function Container16() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pr-[16px] relative size-full">
        <SwitchTampilkanDiPetaPendidikan />
        <ButtonTampilkanPendidikan />
      </div>
    </div>
  )
}

function Container12() {
  return (
    <div className="relative shrink-0 w-[438px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button1 />
        <Container16 />
      </div>
    </div>
  )
}

function Container11() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div
        aria-hidden
        className="absolute border-[rgba(225,229,232,0.4)] border-solid border-t inset-0 pointer-events-none"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-px relative size-full">
        <Container12 />
      </div>
    </div>
  )
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="18"
        preserveAspectRatio="none"
        viewBox="0 0 18 18"
        width="18"
      >
        <g clipPath="url(#clip0_0_14)" id="Icon">
          <path
            d={svgPaths.p61f9880}
            id="Vector"
            stroke="#FE9A00"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d={svgPaths.p266da370}
            id="Vector_2"
            stroke="#FE9A00"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d={svgPaths.p12d64e80}
            id="Vector_3"
            stroke="#FE9A00"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
        <defs>
          <clipPath id="clip0_0_14">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

function Container19() {
  return (
    <div
      className="bg-[#fffbeb] relative rounded-[16px] shrink-0 size-[36px]"
      data-name="Container"
    >
      <div
        aria-hidden
        className="absolute border border-[rgba(254,230,133,0.6)] border-solid inset-0 pointer-events-none rounded-[16px]"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon4 />
      </div>
    </div>
  )
}

function Text16() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[21px] relative shrink-0 text-[#001e2b] text-[14px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          Belanja Harian
        </p>
      </div>
    </div>
  )
}

function Text17() {
  return (
    <div
      className="bg-[#e0e7ff] relative rounded-[8px] shrink-0"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[16.5px] relative shrink-0 text-[#432dd7] text-[11px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          2
        </p>
      </div>
    </div>
  )
}

function Container21() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Text16 />
        <Text17 />
      </div>
    </div>
  )
}

function Text18() {
  return (
    <div className="h-[19px] relative shrink-0 w-[254px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[0] relative shrink-0 text-[#096] text-[0px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          <span className="leading-[16.5px] text-[11px]">Sangat Dekat</span>
          <span
            className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[16.5px] text-[#5c6c7a] text-[11px]"
            style={{ fontVariationSettings: '"opsz" 14' }}
          >{` · terdekat 0.04 km`}</span>
        </p>
      </div>
    </div>
  )
}

function Container20() {
  return (
    <div className="h-[40px] relative shrink-0 w-[258px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[4px] relative size-full">
        <Container21 />
        <Text18 />
      </div>
    </div>
  )
}

function Button2() {
  return (
    <div className="min-h-[44px] relative shrink-0" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center min-h-[inherit] pl-[16px] pr-[8px] py-[16px] relative size-full">
        <Container19 />
        <Container20 />
      </div>
    </div>
  )
}

function Text20() {
  return (
    <div
      className="absolute bg-[#1e1e1e] left-[2px] rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] size-[16px] top-[2px]"
      data-name="Text"
    />
  )
}

function TextTransform2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text:transform">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Text20 />
      </div>
    </div>
  )
}

function Text19() {
  return (
    <div
      className="bg-[#e2e8f0] h-[20px] relative rounded-[33554400px] shrink-0 w-[36px]"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <TextTransform2 />
      </div>
    </div>
  )
}

function SwitchTampilkanDiPetaBelanjaHarian() {
  return (
    <div
      className="relative rounded-[12px] shrink-0 size-[44px]"
      data-name="Switch - Tampilkan di peta: Belanja Harian"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text19 />
      </div>
    </div>
  )
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="16"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
        width="16"
      >
        <g id="Icon">
          <path
            d="M6 12L10 8L6 4"
            id="Vector"
            stroke="#5C6C7A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
        </g>
      </svg>
    </div>
  )
}

function ButtonTampilkanBelanjaHarian() {
  return (
    <div
      className="relative rounded-[12px] shrink-0 size-[44px]"
      data-name="Button - Tampilkan Belanja Harian"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon5 />
      </div>
    </div>
  )
}

function Container22() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pr-[16px] relative size-full">
        <SwitchTampilkanDiPetaBelanjaHarian />
        <ButtonTampilkanBelanjaHarian />
      </div>
    </div>
  )
}

function Container18() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button2 />
        <Container22 />
      </div>
    </div>
  )
}

function Container17() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div
        aria-hidden
        className="absolute border-[rgba(225,229,232,0.4)] border-solid border-t inset-0 pointer-events-none"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-px relative size-full">
        <Container18 />
      </div>
    </div>
  )
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="18"
        preserveAspectRatio="none"
        viewBox="0 0 18 18"
        width="18"
      >
        <g id="Icon">
          <path
            d="M9 9.75V15.75"
            id="Vector"
            stroke="#0092B8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d="M9 2.25V4.5"
            id="Vector_2"
            stroke="#0092B8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
          <path
            d={svgPaths.p24d66280}
            id="Vector_3"
            stroke="#0092B8"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  )
}

function Container25() {
  return (
    <div
      className="bg-[#ecfeff] relative rounded-[16px] shrink-0 size-[36px]"
      data-name="Container"
    >
      <div
        aria-hidden
        className="absolute border border-[rgba(162,244,253,0.6)] border-solid inset-0 pointer-events-none rounded-[16px]"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center p-px relative size-full">
        <Icon6 />
      </div>
    </div>
  )
}

function Text21() {
  return (
    <div className="relative shrink-0" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[21px] relative shrink-0 text-[#001e2b] text-[14px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >{`Stasiun & Tol`}</p>
      </div>
    </div>
  )
}

function Text22() {
  return (
    <div
      className="bg-[#e0e7ff] relative rounded-[8px] shrink-0"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[6px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:Bold',sans-serif] font-bold leading-[16.5px] relative shrink-0 text-[#432dd7] text-[11px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          2
        </p>
      </div>
    </div>
  )
}

function Container27() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[6px] items-center relative size-full">
        <Text21 />
        <Text22 />
      </div>
    </div>
  )
}

function Text23() {
  return (
    <div className="h-[19px] relative shrink-0 w-[254px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[2px] relative size-full">
        <p
          className="[word-break:break-word] font-['DM_Sans:SemiBold',sans-serif] font-semibold leading-[0] relative shrink-0 text-[#e17100] text-[0px] whitespace-nowrap"
          style={{ fontVariationSettings: '"opsz" 14' }}
        >
          <span className="leading-[16.5px] text-[11px]">Cukup Jauh</span>
          <span
            className="font-['DM_Sans:Medium',sans-serif] font-medium leading-[16.5px] text-[#5c6c7a] text-[11px]"
            style={{ fontVariationSettings: '"opsz" 14' }}
          >{` · terdekat 1.88 km`}</span>
        </p>
      </div>
    </div>
  )
}

function Container26() {
  return (
    <div
      className="flex-[258_0_0] h-[40px] min-w-px relative"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pl-[4px] relative size-full">
        <Container27 />
        <Text23 />
      </div>
    </div>
  )
}

function Button3() {
  return (
    <div
      className="flex-[326_0_0] min-h-[44px] min-w-px relative"
      data-name="Button"
    >
      <div className="flex flex-row items-center min-h-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center min-h-[inherit] pl-[16px] pr-[8px] py-[16px] relative size-full">
          <Container25 />
          <Container26 />
        </div>
      </div>
    </div>
  )
}

function Text25() {
  return (
    <div
      className="absolute bg-[#1e1e1e] left-[2px] rounded-[33554400px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] size-[16px] top-[2px]"
      data-name="Text"
    />
  )
}

function TextTransform3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Text:transform">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Text25 />
      </div>
    </div>
  )
}

function Text24() {
  return (
    <div
      className="bg-[#e2e8f0] h-[20px] relative rounded-[33554400px] shrink-0 w-[36px]"
      data-name="Text"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <TextTransform3 />
      </div>
    </div>
  )
}

function SwitchTampilkanDiPetaStasiunTol() {
  return (
    <div
      className="relative rounded-[12px] shrink-0 size-[44px]"
      data-name="Switch - Tampilkan di peta: Stasiun & Tol"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text24 />
      </div>
    </div>
  )
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg
        className="absolute block inset-0 size-full"
        fill="none"
        height="16"
        preserveAspectRatio="none"
        viewBox="0 0 16 16"
        width="16"
      >
        <g id="Icon">
          <path
            d="M6 12L10 8L6 4"
            id="Vector"
            stroke="#5C6C7A"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.33333"
          />
        </g>
      </svg>
    </div>
  )
}

function ButtonTampilkanStasiunTol() {
  return (
    <div
      className="relative rounded-[12px] shrink-0 size-[44px]"
      data-name="Button - Tampilkan Stasiun & Tol"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon7 />
      </div>
    </div>
  )
}

function Container28() {
  return (
    <div className="relative shrink-0" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pr-[16px] relative size-full">
        <SwitchTampilkanDiPetaStasiunTol />
        <ButtonTampilkanStasiunTol />
      </div>
    </div>
  )
}

function Container24() {
  return (
    <div className="relative shrink-0 w-[438px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button3 />
        <Container28 />
      </div>
    </div>
  )
}

function Container23() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div
        aria-hidden
        className="absolute border-[rgba(225,229,232,0.4)] border-solid border-t inset-0 pointer-events-none"
      />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-px relative size-full">
        <Container24 />
      </div>
    </div>
  )
}

function Container() {
  return (
    <div
      className="bg-[#1e1e1e] h-[454px] relative rounded-[24px] shrink-0 w-full"
      data-name="Container"
    >
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Container1 />
        <Container11 />
        <Container17 />
        <Container23 />
      </div>
      <div
        aria-hidden
        className="absolute border border-[#e1e5e8] border-solid inset-0 pointer-events-none rounded-[24px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"
      />
    </div>
  )
}

export default function TabPanel() {
  return (
    <div
      className="content-stretch flex flex-col gap-[12px] items-start pb-[64px] relative size-full"
      data-name="Tab Panel"
    >
      <Paragraph />
      <Container />
    </div>
  )
}
