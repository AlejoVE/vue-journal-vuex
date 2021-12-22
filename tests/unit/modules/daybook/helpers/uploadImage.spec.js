import axios from 'axios';
import cloudinary from 'cloudinary';
import uploadImage from '@/modules/daybook/helpers/uploadImage';

cloudinary.config({
    cloud_name: process.env.VUE_APP_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.VUE_APP_CLOUDINARY_API_KEY,
    api_secret: process.env.VUE_APP_CLOUDINARY_API_SECRET,
})

describe('Tests in uploadImage helper', () => {
    test('should upload a file and return url', async(done) => {
       const {data} =  await axios.get('https://res.cloudinary.com/daqcbpbh1/image/upload/v1639492761/fi6aoffcmwivu0cbhdvu.png', {
            responseType: 'arraybuffer'
        })
        const file = new File([data], 'test.png')
        const url =  await uploadImage(file)
        expect(typeof url).toBe('string')

        // Delete image from cloudinary
        const segments = url.split('/')
        const imageId = segments.at(-1).replace('.png', '')
        cloudinary.v2.api.delete_resources(imageId, {}, () => {
             done()
        })

    })
    
})
