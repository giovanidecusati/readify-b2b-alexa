using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RaffleWeb.Models;
using System;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace RaffleWeb.Controllers
{
    public class HomeController : Controller
    {
        private readonly RaffleDbContext _raffleDbContext;

        public HomeController(RaffleDbContext raffleDbContext)
        {
            _raffleDbContext = raffleDbContext;
        }

        public IActionResult Index()
        {
            return View(new Person());
        }

        public async Task<IActionResult> Post(Person person)
        {
            if (ModelState.IsValid)
            {
                if ((await _raffleDbContext.People.AnyAsync(p => p.Name == person.Name)))
                {
                    ModelState.TryAddModelError("Name", "There is a record with this name.");
                    return View("Index", person);
                }

                await _raffleDbContext.People.AddAsync(person);
                await _raffleDbContext.SaveChangesAsync();

                return View("Thanks");
            }

            return View("Index", person);
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public async Task<Person> Raffle() => await _raffleDbContext.People.OrderBy(p => Guid.NewGuid()).FirstOrDefaultAsync();
    }
}
