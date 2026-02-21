# reminder

### Tech stack

1. Backend : Python + FastAPI
2. Frontend : JavaScript/TypeScript + React + Vite
3. Database : PostgreSQL

# Getting Started


# How to use Alembic

1. Autogenerate file of migration

```bash
alembic revision --autogenerate -m "<your-commit>"
```
<br>

2. Apply migration
```bash
alembic upgrade head
```

<br>

3. Check current file migration
```bash
alembic current
```