# GMAO Database Seeders

This directory contains comprehensive seeders based on the `gmao_db (1).sql` file. The seeders populate the database with realistic test data for the GMAO GMAO system.

## Seeders Overview

### 1. Core Data Seeders (Must run in order due to foreign key dependencies)

#### UserSeeder
- Creates system users with different roles
- Includes admin, technician, operator, and supervisor users
- **Sample Users:**
  - admin@gmao.com (admin/admin)
  - rihab.bani@uit.ac.ma (admin/password)
  - Multiple technical staff accounts

#### RameSeeder  
- Creates train units (rames) with maintenance schedules
- Based on actual Z2M train data from the SQL file
- **Data:** 22 trains (101-124, excluding some numbers)
- Each rame has maintenance dates and schedule info

#### RakSeeder
- Creates carriages (raks) for each rame
- Each rame typically has 2 carriages (M and MH types)
- **Dependencies:** Requires RameSeeder to run first
- Uses realistic GTW carriage names from the SQL data

#### CarteSeeder
- Creates electronic cards for each rak
- 6 cards per rak: COM-G, MAU-G, AUSN-G, COM-D, MAU-D, AUSN-D
- **Dependencies:** Requires RakSeeder to run first
- Uses real card references from the original data
- Most cards are functional, some have various failure statuses

### 2. Historical and Tracking Data

#### HistoriqueCarteSeeder
- Creates installation history for all cards
- Tracks when cards were installed/removed
- **Dependencies:** Requires CarteSeeder to run first
- Some cards have multiple installation events

#### PanneSeeder
- Creates failure type definitions
- 15 different failure types with severity levels
- Covers common electronic component failures
- **Categories:** Critical, High, Medium, Low severity

#### SubirSeeder
- Links cards to their associated failures
- Only non-functional cards are linked to failures
- **Dependencies:** Requires CarteSeeder and PanneSeeder
- Realistic failure associations

### 3. Operational Data

#### MaintenanceSeeder
- Creates maintenance records with detailed descriptions
- 8 comprehensive maintenance entries
- Long-form French descriptions of technical issues
- **Content:** Real maintenance scenarios and procedures

#### InterventionSeeder  
- Creates intervention records for repairs and maintenance
- 10 detailed intervention records
- Comprehensive work descriptions
- **Content:** Technical repair procedures and outcomes

#### RemplacementCarteSeeder (Enhanced)
- Creates card replacement history with technical causes
- 35 replacement records with realistic data
- **Features:**
  - 15 different technical failure causes
  - 10 different observation types
  - Updates old card status based on replacement reason
  - Tries to match card types for realistic replacements

## Usage Instructions

### Running All Seeders
```bash
# Reset database and run all seeders
php artisan migrate:fresh --seed

# Or run seeders only (without resetting)
php artisan db:seed
```

### Running Individual Seeders
```bash
# Run specific seeder
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=RameSeeder
php artisan db:seed --class=CarteSeeder
# etc.
```

### Running Seeders in Correct Order
If running individual seeders, follow this order due to foreign key dependencies:

1. `UserSeeder` - No dependencies
2. `RameSeeder` - No dependencies  
3. `RakSeeder` - Depends on Rames
4. `CarteSeeder` - Depends on Raks
5. `HistoriqueCarteSeeder` - Depends on Cartes
6. `PanneSeeder` - No dependencies
7. `SubirSeeder` - Depends on Cartes and Pannes
8. `MaintenanceSeeder` - No dependencies
9. `InterventionSeeder` - No dependencies
10. `RemplacementCarteSeeder` - Depends on Cartes

## Data Statistics

After running all seeders, you'll have approximately:
- **Users:** 6 users with different roles
- **Rames:** 22 train units
- **Raks:** ~44 carriages (2 per rame)
- **Cartes:** ~264 electronic cards (6 per rak)
- **Historique:** ~290 installation history records
- **Pannes:** 15 failure type definitions
- **Subir:** ~50-80 card-failure associations
- **Maintenances:** 8 detailed maintenance records
- **Interventions:** 10 detailed intervention records
- **Remplacements:** 35 card replacement records

## Technical Notes

### Card Status Distribution
- ~80% of cards are "fonctionnel" (functional)
- ~20% have various failure statuses (en panne, en maintenance, hors service)

### Realistic Data Features
- Dates span the last 6 months for recent activity
- Card references match actual equipment codes
- French technical descriptions for maintenance/interventions
- Proper foreign key relationships maintained
- Status updates reflect realistic operational scenarios

### Database Relationships
All foreign key relationships from the original SQL are maintained:
- Raks → Rames
- Cartes → Raks  
- HistoriqueCartes → Cartes
- RemplacementCartes → Cartes (both old and new)
- Subirs → Cartes and Pannes

## Troubleshooting

### Common Issues
1. **Foreign Key Errors:** Ensure seeders run in the correct order
2. **Duplicate Data:** Use `migrate:fresh --seed` to reset completely
3. **Database Connection:** Ensure your database server is running and `.env` is configured

### Verification
Check seeded data with:
```bash
php artisan tinker
>>> App\Models\Rame::count()
>>> App\Models\Carte::count()  
>>> App\Models\User::count()
```

## Customization

To modify the data:
1. Edit the respective seeder files
2. Adjust the data arrays or generation logic
3. Re-run the specific seeder: `php artisan db:seed --class=SeederName`

Each seeder is designed to be idempotent when possible, but for best results, use `migrate:fresh --seed` for complete regeneration.
