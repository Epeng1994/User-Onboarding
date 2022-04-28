describe('All test', ()=>{
    beforeEach(()=>{
        cy.visit('http://localhost:3000')
    })
    const first_name = () => cy.get('input[name=first_name')
    const last_name = () => cy.get('input[name=last_name')
    const email = () => cy.get('input[name=email')
    const password = () => cy.get('input[name=password')
    const TOS = () => cy.get('input[name=TOS')
    const role = () => cy.get('select[name=role')
    const submitBttn = () => cy.get('button[type = submit]')

    describe('Basic Stuff',()=>{
        it('Can go to desired site',()=>{
            cy.url().should('include','localhost')
        })
        it('Input boxes are there',()=>{
            first_name().should('exist')
            last_name().should('exist')
            email().should('exist')
            password().should('exist')
            TOS().should('exist')
            role().should('exist')
        })
        it('Input boxes accept entries',()=>{
            first_name().type('Eric')
            last_name().type('Peng')
            email().type('abc123@gmail.com')
            password().type('123456')
            TOS().check()
            role().select('Engineer')

            first_name().should('have.value','Eric')
            last_name().should('have.value','Peng')
            email().should('have.value','abc123@gmail.com')
            password().should('have.value','123456')

            submitBttn().should('not.be.disabled')
        })
        it('Submits information correctly',()=>{
            first_name().type('Eric')
            last_name().type('Peng')
            email().type('abc123@gmail.com')
            password().type('123456')
            TOS().check()
            role().select('Engineer')
            submitBttn().should('not.be.disabled')
            submitBttn().click()

            cy.contains('Eric Peng').should('exist')
        })
        it('Input left empty, error messages appear',()=>{
            first_name().type(' ')
            cy.contains(/you don't have/i)
            last_name().type(' ')
            email().type(' ')
            password().type(' ')
            submitBttn().should('be.disabled')
        })
    })














})