# Mega Nice SQL

A mega nice SQL query composer.

## Install

`npm install mega-nice-sql`

## Overview

### Insert, Select, Update, Delete (ISUD)

```typescript
import sql from 'mega-nice-sql'

sql.insertInto('table').value('name', 'Josa')
sql.select('*').from('table').where('id', 1)
sql.update('table').set('name', 'Sebastian').where('id', 1)
sql.deleteFrom('table').where('id', 1)
```

### Render to SQL

```typescript
let query = sql.select('*').from('table')
query.sql() == 'SELECT * FROM table'
```

### Join

```typescript
let query = sql.select('t1.id, t2.name').from('table1 t1').join('table2 t2', 't1.id = t2.table1Id')
query.sql() == 'SELECT t1.id, t2.name FROM table1 t1 JOIN table2 t2 ON t1.id = t2.table1Id'
```

```typescript
let query = sql.select('t1.id, t2.name').from('table1 t1').join('left', 'table2 t2', 't1.id = t2.table1Id')
query.sql() == 'SELECT t1.id, t2.name FROM table1 t1 LEFT JOIN table2 t2 ON t1.id = t2.table1Id'
```

### Where

```typescript
let query = sql.select('*').from('table').where('id')

query.sql() == 'SELECT * FROM table WHERE id = ?'
query.sql('postgres') == 'SELECT * FROM table WHERE id = $1'
```

```typescript
let query = sql.select('*').from('table').where('id', 1)

query.sql() == 'SELECT * FROM table WHERE id = ?'
query.sql('postgres') == 'SELECT * FROM table WHERE id = $1'

query.values() == [ 1 ]
```

```typescript
let query = sql.select('*').from('table').where('id', '>', 1)

query.sql() == 'SELECT * FROM table WHERE id > ?'
query.sql('postgres') == 'SELECT * FROM table WHERE id > $1'

query.values() == [ 1 ]
```

```typescript
let query = sql.select('*').from('table').where('id', '>', 1)

query.sql() == 'SELECT * FROM table WHERE id > ?'
query.sql('postgres') == 'SELECT * FROM table WHERE id > $1'

query.values() == [ 1 ]
```

```typescript
sql.select('*').from('table').where('id IS NULL')
sql.select('*').from('table').where('id is null') // will be converted to uppercase
sql.select('*').from('table').where('id IS nulL') // will be converted to uppercase
sql.select('*').from('table').where('id', 'NULL')
sql.select('*').from('table').where('id', 'NOT NULL')
sql.select('*').from('table').where('id', null)
```

```typescript
sql.select('*').from('table').where('id', 'IN', [ 1, 2, 3 ])
sql.select('*').from('table').where('id IN', [ 1, 2, 3 ])
sql.select('*').from('table').where('id', [ 1, 2, 3 ])

query.sql() == 'SELECT * FROM table WHERE id IN [?, ?, ?]'
query.sql('postgres') == 'SELECT * FROM table WHERE id IN [$1, $2, $3]'

query.values() == [ 1, 2, 3]
```

```typescript
sql.select('*').from('table').where('name', 'LIKE', '%ert%')
```

```typescript
let query = sql.select('*').from('table').where('id', [ 1, 2, 3]).where('name', 'LIKE', '%ert%')

query.sql() == 'SELECT * FROM table WHERE id IN [?, ?, ?] AND name LIKE \'%ert\''
query.sql('postgres') == 'SELECT * FROM table WHERE id IN [$1, $2, $3] AND name LIKE \'%ert\''

query.values() == [ 1, 2, 3, '%ert%' ]
```

### Order By, Limit, Offest

```typescript
sql.select('*').from('table').orderBy('id', 'DESC').limit(10).offset(100)
```

### Returning (Postgres)

```typescript
sql.select('*').from('table').returning('+')
```