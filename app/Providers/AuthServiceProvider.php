<?php

namespace App\Providers;

use App\Models\Event;
use App\Models\Team;
use App\Models\Kpi;
use App\Models\Periode;
use App\Models\JobDesk;
use App\Policies\EventPolicy;
use App\Policies\TeamPolicy;
use App\Policies\KpiPolicy;
use App\Policies\PeriodePolicy;
use App\Policies\JobDeskPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Team::class => TeamPolicy::class,
        Event::class => EventPolicy::class,
        Kpi::class => KpiPolicy::class,
        Periode::class => PeriodePolicy::class,
        JobDesk::class => JobDeskPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
    }
}
