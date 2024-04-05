export const convertDate = (date) => {
	return new Date(date).toLocaleDateString("en-US", {
		month: "long",
		day: "numeric",
	});
};

export const getTargetDate = (target) => {
	const currentDate = new Date();
	return new Date(currentDate.getTime() - target * 24 * 60 * 60 * 1000);
}