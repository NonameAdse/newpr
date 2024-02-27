export const formatCreatedAt = (createdAtMillis: number): string => {
	const date = new Date(createdAtMillis);
	const now = new Date();
	const diff = Math.abs(now.getTime() - date.getTime());

	const formatTime = (time: number, unit: string): string => {
		const rounded = Math.round(time);
		return `${rounded} ${unit}${rounded !== 1 ? "" : ""} ago`;
	};

	if (diff < 60 * 1000) {
		return formatTime(diff / 1000, "minutes");
	}
	if (diff < 60 * 60 * 1000) {
		return formatTime(diff / (60 * 1000), "minutes");
	}
	if (diff < 24 * 60 * 60 * 1000) {
		return formatTime(diff / (60 * 60 * 1000), "hours");
	}
	if (diff < 30 * 24 * 60 * 60 * 1000) {
		return formatTime(diff / (24 * 60 * 60 * 1000), "days");
	}
	if (diff < 12 * 30 * 24 * 60 * 60 * 1000) {
		return formatTime(diff / (30 * 24 * 60 * 60 * 1000), "months");
	}
	return date.toLocaleDateString();
};
