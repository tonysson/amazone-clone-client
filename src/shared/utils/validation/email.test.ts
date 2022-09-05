import  { validateEmail } from './email';

describe('Email validation', () => {
    let email = '' ;
    test('An empty input should not be valid', () => {
        expect(validateEmail(email)).toEqual(false)
    })

    test('it Should have an @ symbol', () => {
        email = 'sibi@gmail.com'
        expect(email.includes('@')).toEqual(true)
    })

    test('it Should have an . symbol', () => {
        email = 'sibi@gmail.com'
        expect(email.includes('.')).toEqual(true)
    })

    test('a valid email', () => {
        email = 'sibi@gmail.com'
        expect(validateEmail(email)).toEqual(true)
    })

    test('an invalid email not pass validation', () => {
        email = 'sibi@gmail'
        expect(validateEmail(email)).toEqual(false)
    })
})