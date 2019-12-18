<?php

use App\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $usersCount = max((int) $this->command->ask('How many users would you like to add?', 20),1);
        factory(User::class)->states('john-doe')->create();
        factory(User::class, $usersCount)->create();
    }
}
