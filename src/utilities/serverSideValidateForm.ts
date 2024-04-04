export function validateForm(formData: any) {
    const errors = []
        
        if (!formData.name || formData.name.trim() === '') {
            errors.push('Name is required');
        }

        if (!formData.flight_number || parseInt(formData.flight_number) <= 0) {
            errors.push('Flight number is required');
        }

        if ( !formData.data_local || formData.data_local === '') {
            errors.push('Data local is required');
        }

        if ( formData.success === undefined || !(formData.success === '0' || formData.success === '1')) {
            errors.push('Success is required');
        }

        if ( !formData.image_small || !/\.(jpg|jpeg|png|gif)$/i.test(formData.image_small)) {
            errors.push('Image small is required');
        }

        if ( !formData.image_large || !/\.(jpg|jpeg|png|gif)$/i.test(formData.image_small)) {
            errors.push('Image large is required');
        }

        if ( !formData.webcast_code || formData.webcast_code.length !== 11) {
            errors.push('Webcast code is required');
        }

        if ( !formData.details || formData.details.trim() === '') {
            errors.push('Details is required');
        }

        if ( !formData.article || !/^(http|https):\/\/[^ "]+$/.test(formData.article)){
            errors.push('Article is required');
        }

    return errors;
}