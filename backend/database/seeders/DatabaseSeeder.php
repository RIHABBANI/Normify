<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     * 
     * Run this seeder with: php artisan db:seed
     * Or run individual seeders with: php artisan db:seed --class=SeederName
     */
    public function run(): void
    {
        $this->call([
            // Core data - must be seeded in order due to foreign keys
            UserSeeder::class,           // Users (no dependencies)
            RameSeeder::class,           // Rames (no dependencies)
            RakSeeder::class,            // Raks (depends on Rames)
            CarteSeeder::class,          // Cartes (depends on Raks)
            
            // Historical and operational data
            HistoriqueCarteSeeder::class, // Historique (depends on Cartes)
            PanneSeeder::class,          // Pannes (no dependencies)
            SubirSeeder::class,          // Subir relationships (depends on Cartes and Pannes)
            
            // Maintenance and operational data
            MaintenanceSeeder::class,    // Maintenances (no dependencies)
            InterventionSeeder::class,   // Interventions (no dependencies)
            RemplacementCarteSeeder::class, // Remplacements (depends on Cartes)
        ]);
        
        $this->command->info('🎉 All seeders completed successfully!');
        $this->command->info('📊 Database has been populated with comprehensive test data.');
        $this->command->line('');
        $this->command->info('Created data includes:');
        $this->command->info('- Users with different roles');
        $this->command->info('- Rames (trains) with realistic maintenance schedules');
        $this->command->info('- Raks (carriages) for each rame');
        $this->command->info('- Cartes (cards) with various statuses');
        $this->command->info('- Historical tracking of card installations');
        $this->command->info('- Comprehensive failure/panne definitions');
        $this->command->info('- Realistic maintenance records');
        $this->command->info('- Detailed intervention logs');
        $this->command->info('- Card replacement history with technical causes');
    }
}
