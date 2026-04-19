export const getUnitTypeLabel = (unitType) => {
  const labels = {
    sq_m: 'm²',
    sq_ft: 'sq ft',
    m: 'm',
    feddan: 'Feddan',
    kirat: 'Kirat',
    sahm: 'Sahm',
    hectare: 'ha',
    acre: 'Acre',
  };
  return labels[unitType] || unitType || 'm²';
};

export const getFinishStatusLabel = (status) => {
  const labels = {
    without_finish: 'Without Finish',
    semi_finished: 'Semi Finished',
    fully_finished: 'Fully Finished',
    super_lux: 'Super Lux',
    deluxe_finish: 'Deluxe Finish',
  };
  return labels[status] || status || 'Without Finish';
};

export const getFinishStatusInArabic = (status) => {
  const labels = {
    without_finish: 'بدون تشطيب',
    semi_finished: 'نصف تشطيب',
    fully_finished: 'تشطيب كامل',
    super_lux: 'سوبر لوكس',
    deluxe_finish: 'تشطيب ديلوكس',
  };
  return labels[status] || status || 'بدون تشطيب';
};

export const productSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};
