const retrieveImages = async () => {
    try {
        const response = await fetch('/api/images', {
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const data = await response.json();

        if(!response.ok){
            throw new Error("Invalid image API response, check network tab!");
        }

        return data
    } catch (err: any){
        console.log('Error from image data retrieval:', err);
        return []
    }
}

const createImage = async (body: ImageData) => {
    try {
        const response = await fetch('/api/images', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
            },
            body: JSON.stringify(body)
        })

        const data = response.json();

        if(!response.ok){
            throw new Error('invalid API response, check nework tab!')
        }

        return data
    } catch (err: any){
        console.log('ERROR from Image upload: ', err);
        return Promise.reject('Could not create Image');
    }
}

export {retrieveImages, createImage}