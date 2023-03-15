import React from "react";

type Dimension = {
  feet: number;
  inches: number;
};

type Size = {
  width?: Dimension;
  length?: Dimension;
  height?: Dimension;
};

type DimensionKey = keyof Dimension;
type SizeKey = keyof Size;

const dimensionLabels: Record<DimensionKey, string> = {
  feet: "ft",
  inches: "in",
};

const sizeLabels: Record<SizeKey, string> = {
  width: "Width",
  length: "Length",
  height: "Height",
};

function getDimensionLabel(dimension: DimensionKey): string {
  return dimensionLabels[dimension];
}

function getSizeLabel(size: SizeKey): string {
  return sizeLabels[size];
}

function getDimension(
  dimension: DimensionKey,
  dimensionObj: Dimension | undefined
): JSX.Element | null {
  if (!dimensionObj) {
    return null;
  }

  const label = getDimensionLabel(dimension);
  const { feet, inches } = dimensionObj;
  if (!dimension || (!feet && !inches)) { return <></>}
  return (<>
    <div className="opaci-50 tx-ls-2  tx-sm">
      {/* {label} {feet}' {inches}" */}
      
        <div className='flex-col pa-1 ma-1 bord-r-8 bg-b-20'>
            {/* { <div className='opaci-50 tx-ls-2 mb-4 tx-bold-3 tx-sm'>{JSON.stringify(dimensionObj)}</div>} */}
            <div className=' tx-ls-2   tx-sm flex-center'>
                <div className="flex  tx-xsm">{dimension}:</div>
                <div className="flex tx-bold-5 tx-smd">{!!feet && `${feet}'`}</div>
                <div className="flex tx-bold-5 tx-smd">{!!inches && `${inches}"`}</div>
            </div>
        </div>
    </div>
    </>);
}

export default function Component({ size = {} }: { size?: Size }) {
  if (!Object.values(size).some(Boolean)) {
    return <div>no size</div>;
  }

  return (<>
      {Object.keys(size).map((dimension) => (
        <React.Fragment key={dimension}>
          {getDimension(
            dimension as DimensionKey,
            size[dimension as DimensionKey]
          )}
        </React.Fragment>
      ))}
  </>);
}