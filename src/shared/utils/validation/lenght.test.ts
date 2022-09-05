import { validateNameLenght , validatePasswordLenght } from "./length";



describe('Field Length validation', () => {
    
    describe('Name Field', () => {
        let name = '' ;
        test('An empty name should not be valid', () => {
            expect(validateNameLenght(name)).toEqual(false)
        })

        test('A name should not be valid when less than 2', () => {
            name = "s"
            expect(validateNameLenght(name)).toEqual(false)
        })

        test('A valid name', () => {
            name = "toto"
            expect(validateNameLenght(name)).toEqual(true)
        })
    })

    describe('Password Field', () => {
        let password = '' ;
        test('An empty password should not be valid', () => {
            expect(validatePasswordLenght(password)).toEqual(false)
        })

        test('A name should not be valid when less than 6', () => {
            password = "steue"
            expect(validatePasswordLenght(password)).toEqual(false)
        })

        test('A valid Password', () => {
            password = "totoisBack"
            expect(validatePasswordLenght(password)).toEqual(true)
        })
    })

})