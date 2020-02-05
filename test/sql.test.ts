import { expect } from 'chai'
import 'mocha'
import sql from '../src/sql'

describe('sql', function() {
  describe('MySql', function() {
    describe('INSERT INTO', function() {
      it('should create an insert into SQL statement', function() {
        let query = sql.insertInto('table')
        query.value('a', 'a')
        query.value('b', 'b')

        let sqlString = query.sql()
        
        expect(sqlString).to.equal('INSERT INTO table (a, b) VALUES (?, ?);')
      })
    
      it('should create an insert into SQL statement for an empty row', function() {
        let query = sql.insertInto('table')
        let sqlString = query.sql()
        expect(sqlString).to.equal('INSERT INTO table DEFAULT VALUES;')
      })    
    })

    describe('SELECT', function() {
      it('should create a select SQL statement', function() {
        let query = sql.select('*').from('table').where('a', 'a').where('b', '>', 'b')
        let sqlString = query.sql()
        expect(sqlString).to.equal('SELECT * FROM table WHERE a = ? AND b > ?;')
      })

      it('should create a select SQL statement without where criteria', function() {
        let query = sql.select('*').from('table')
        let sqlString = query.sql()
        expect(sqlString).to.equal('SELECT * FROM table;')
      })
    })
  })

  describe('PostgreSQL', function() {
    describe('INSERT INTO', function() {
      it('should create an insert into SQL statement', function() {
        let query = sql.insertInto('table')
        query.value('a', 'a')
        query.value('b', 'b')

        let sqlString = query.sql('postgres')
        
        expect(sqlString).to.equal('INSERT INTO table (a, b) VALUES ($1, $2);')
      })
    
      it('should create an insert into SQL statement for an empty row', function() {
        let query = sql.insertInto('table')
        let sqlString = query.sql('postgres')
        expect(sqlString).to.equal('INSERT INTO table DEFAULT VALUES;')
      })    
    })

    describe('SELECT', function() {
      it('should create a select SQL statement', function() {
        let query = sql.select('*').from('table').where('a', 'a').where('b', '>', 'b')
        let sqlString = query.sql('postgres')
        expect(sqlString).to.equal('SELECT * FROM table WHERE a = $1 AND b > $2;')
      })

      it('should create a select SQL statement without where criteria', function() {
        let query = sql.select('*').from('table')
        let sqlString = query.sql('postgres')
        expect(sqlString).to.equal('SELECT * FROM table;')
      })
    })
  })
})