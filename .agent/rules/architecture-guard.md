name: Architecture Guard

rules:
  - Never create duplicate services (Gemini, Auth, Analytics)
  - Always use src/backend/ as single backend source
  - Block creation of parallel API folders
  - Prefer refactoring over duplication
  - Enforce single source of truth for business logic
