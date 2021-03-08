describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST','http://localhost:3001/api/users',{
      username:'testimies',
      name:'Testi Mies',
      password:'pass'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown',function(){
    cy.contains('Log in to application')
  })

  describe('Login',function(){
    it('succeeds with correct credentials',function(){
      cy.get('#username').type('testimies')
      cy.get('#password').type('pass')
      cy.get('#loginButton').click()

      cy.contains('Testi Mies logged in')
    })

    it('fails with wrong credentials',function(){
      cy.get('#username').type('testimies')
      cy.get('#password').type('wrong')
      cy.get('#loginButton').click()

      cy.get('.error').contains('wrong credentials')
      cy.get('html').should('not.contain','Testi Mies logged in')
    })
  })

  describe('When logged in',function(){
    beforeEach(function(){
      cy.login({ username:'testimies',password:'pass' })
    })

    it('A blog can be created',function(){
      cy.contains('add blog').click()
      cy.get('#title').type('testiblogi')
      cy.get('#author').type('Testi Author')
      cy.get('#url').type('testiurl.fi')
      cy.get('#create').click()

      cy.contains('Added testiblogi')
      cy.contains('Testi Author')
      cy.contains('testiurl.fi')
    })

    describe('and blogs exists',function(){
      beforeEach(function(){
        cy.createBlog({ title:'testititle',author:'Testi Author',url:'testiurl.fi' })
        cy.createBlog({ title:'testititle2',author:'Testi Author',url:'testiurl.fi' })
      })

      it('like works',function(){
        cy.contains('testititle2').contains('view').click()
        cy.contains('testititle2').next().contains('like').click()

        cy.contains('testititle2')
          .next()
          .contains('likes: 1')
      })

      it('blog can be deleted',function(){
        cy.contains('testititle2').contains('view').click()
        cy.contains('testititle2').next().contains('remove').click()

        cy.get('html').should('not.contain','testititle2')
      })

      it('blogs are arranged by likes',function(){
        cy.contains('testititle2').contains('view').click()
        cy.contains('testititle2').parent().find('#like').click()
        cy.wait(500)
        cy.contains('testititle2').parent().find('#like').click()
        cy.wait(500)
        cy.contains('hide').click()
        cy.get('.blog').eq(0).contains('testititle2')
      })
    })
  })
})

