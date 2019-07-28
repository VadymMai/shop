console.log('run');

$('body').on('focus', 'input.form-control', (e) => {
    $(e.target).next('label').addClass('active');
    //console.log('Элемент foo получил фокус.');
});

$('body').on('blur', 'input.form-control', (e) => {
    $(e.target).next('label').removeClass('active');
    //console.log('Элемент foo потерял фокус.');
});
