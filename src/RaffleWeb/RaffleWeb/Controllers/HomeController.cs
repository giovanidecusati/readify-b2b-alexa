using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
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
        private readonly ILogger<HomeController> _logger;

        public HomeController(RaffleDbContext raffleDbContext, ILogger<HomeController> logger)
        {
            _raffleDbContext = raffleDbContext;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View(new Person());
        }

        public async Task<IActionResult> Post(Person person)
        {
            _logger.LogInformation($"Request: {JsonConvert.SerializeObject(person)}.");
            _logger.LogInformation($"ModelState: {JsonConvert.SerializeObject(ModelState)}.");

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

        public async Task<Person> Raffle()
        {
            _logger.LogInformation("Raffle Requested");

            var result = await _raffleDbContext.People.OrderBy(p => Guid.NewGuid()).FirstOrDefaultAsync();

            _logger.LogInformation($"Raffled: {JsonConvert.SerializeObject(result)}.");

            return result;
        }
    }
}
