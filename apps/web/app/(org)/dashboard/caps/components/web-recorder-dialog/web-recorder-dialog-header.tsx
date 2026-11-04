"use client";

import clsx from "clsx";
import { useDashboardContext } from "../../../Contexts";

interface WebRecorderDialogHeaderProps {
	isBusy: boolean;
	onClose: () => void;
}

export const WebRecorderDialogHeader = ({
	isBusy,
	onClose,
}: WebRecorderDialogHeaderProps) => {
	const { user, setUpgradeModalOpen } = useDashboardContext();
	const planLabel = user.isPro ? "Pro" : "Free";
	const planClassName = clsx(
		"ml-2 inline-flex items-center rounded-full px-2 text-[0.7rem] font-medium transition-colors",
		user.isPro
			? "bg-blue-9 text-gray-1"
			: "cursor-pointer bg-gray-3 text-gray-12 hover:bg-gray-4",
	);

	return (
		<>
			<div className="absolute left-3 top-3 flex gap-1.5 items-center">
				<button
					type="button"
					onClick={onClose}
					disabled={isBusy}
					className={clsx(
						"size-3 rounded-full bg-[#FF5F57] border-none p-0",
						isBusy
							? "opacity-50 cursor-not-allowed"
							: "cursor-pointer hover:opacity-80 transition-opacity",
					)}
					aria-label="Close dialog"
				/>
				<div className="size-3 rounded-full bg-gray-8 opacity-50"></div>
				<div className="size-3 rounded-full bg-gray-8 opacity-50"></div>
			</div>
			<div className="flex items-center justify-between pb-[0.25rem]">
				<div className="flex items-center space-x-1">
					<svg
						className="w-[92px] h-auto block dark:hidden"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 118 40"
						aria-label="OlhaAí Logo"
					>
						<title>OlhaAí Logo</title>
						<rect
							width="39.5"
							height="39.5"
							x="0.25"
							y="0.25"
							fill="#fff"
							rx="7.75"
						></rect>
						<rect
							width="39.5"
							height="39.5"
							x="0.25"
							y="0.25"
							stroke="#E7EAF0"
							strokeWidth="0.5"
							rx="7.75"
						></rect>
						<path
							fill="#4785FF"
							d="M20 36c8.837 0 16-7.163 16-16S28.837 4 20 4 4 11.164 4 20s7.164 16 16 16"
						></path>
						<path
							fill="#ADC9FF"
							d="M20 33c7.18 0 13-5.82 13-13S27.18 7 20 7 7 12.82 7 20s5.82 13 13 13"
						></path>
						<path
							fill="#fff"
							d="M20 30c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10"
						></path>
						<path
							fill="#12161F"
							d="M59.606 30.448C65.864 30.448 69.452 26.054 69.452 20.046C69.452 14.066 65.864 9.672 59.606 9.672C53.292 9.672 49.76 14.066 49.76 20.046C49.76 26.054 53.292 30.448 59.606 30.448ZM59.606 26.36C55.962 26.36 54.767 23.523 54.767 20.046C54.767 16.597 55.962 13.76 59.606 13.76C63.222 13.76 64.445 16.597 64.445 20.046C64.445 23.523 63.222 26.36 59.606 26.36ZM73.318 14.066C74.569 14.066 75.543 13.399 75.543 12.092C75.543 10.812 74.569 10.117 73.318 10.117C72.066 10.117 71.093 10.812 71.093 12.092C71.093 13.399 72.066 14.066 73.318 14.066ZM71.093 15.763V30.003H75.543V15.763ZM86.111 19.712C86.111 20.908 84.303 21.186 82.468 21.548C79.13 22.215 77.044 23.523 77.044 26.36C77.044 28.751 78.713 30.448 81.717 30.448C83.608 30.448 85.277 29.558 86.195 28.501H86.25C86.25 29.502 86.807 30.448 88.809 30.448C89.699 30.448 90.506 30.337 91.396 30.003V28.946C90.839 28.946 90.561 28.64 90.561 27.889V21.353C90.561 16.875 88.336 15.318 84.331 15.318C79.687 15.318 77.74 17.626 77.601 20.352H81.773C81.912 18.989 82.69 18.377 84.303 18.377C85.527 18.377 86.111 18.878 86.111 19.712ZM83.274 27.389C82.19 27.389 81.494 26.888 81.494 25.72C81.494 24.83 82.078 24.107 83.831 23.717C84.86 23.495 85.555 23.3 86.111 23.078V24.802C86.111 26.165 85.193 27.389 83.274 27.389ZM101.492 19.712C101.492 20.908 99.684 21.186 97.848 21.548C94.511 22.215 92.425 23.523 92.425 26.36C92.425 28.751 94.094 30.448 97.097 30.448C98.989 30.448 100.657 29.558 101.575 28.501H101.631C101.631 29.502 102.187 30.448 104.189 30.448C105.079 30.448 105.886 30.337 106.776 30.003V28.946C106.22 28.946 105.942 28.64 105.942 27.889V21.353C105.942 16.875 103.717 15.318 99.712 15.318C95.067 15.318 93.12 17.626 92.981 20.352H97.153C97.292 18.989 98.071 18.377 99.684 18.377C100.908 18.377 101.492 18.878 101.492 19.712ZM98.655 27.389C97.57 27.389 96.875 26.888 96.875 25.72C96.875 24.83 97.459 24.107 99.211 23.717C100.24 23.495 100.935 23.3 101.492 23.078V24.802C101.492 26.165 100.574 27.389 98.655 27.389ZM110.698 14.066C111.949 14.066 112.923 13.399 112.923 12.092C112.923 10.812 111.949 10.117 110.698 10.117C109.446 10.117 108.473 10.812 108.473 12.092C108.473 13.399 109.446 14.066 110.698 14.066ZM108.473 15.763V30.003H112.923V15.763Z"
						></path>
					</svg>
					<span
						onClick={() => {
							if (!user.isPro) setUpgradeModalOpen(true);
						}}
						className={planClassName}
					>
						{planLabel}
					</span>
				</div>
			</div>
		</>
	);
};
