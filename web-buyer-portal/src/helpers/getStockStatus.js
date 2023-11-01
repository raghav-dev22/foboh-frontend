import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";

export const stockStatus = (availableQty, stockThreshold) => {
  if (availableQty === 0) {
    return (
      <div className="flex justify-start items-center gap-3">
        <BlockRoundedIcon style={{ fill: "#E94444" }} />
        <p className="text-base font-semibold text-[#2B4447]">Out of stock</p>
      </div>
    );
  } else if (availableQty <= stockThreshold) {
    return (
      <div className="flex justify-start items-center gap-3">
        <WarningRoundedIcon style={{ fill: "#FAD271" }} />
        <p className="text-base font-semibold text-[#2B4447]">
          Stocks limited. Hurry!
        </p>
      </div>
    );
  } else if (availableQty >= stockThreshold) {
    return (
      <div className="flex justify-start items-center gap-3">
        <CheckCircleOutlineIcon style={{ fill: "#009900" }} />
        <p className="text-base font-semibold text-[#2B4447]">
          Available in stock!
        </p>
      </div>
    );
  }
};
