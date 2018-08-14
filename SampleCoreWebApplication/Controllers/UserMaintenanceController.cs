using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using SampleCoreWebApplication.Models;

namespace SampleCoreWebApplication.Controllers
{
    [Route("api/[controller]")]
    public class UserMaintenanceController : Controller
    {
        [HttpGet("[action]")]
        public IEnumerable<User> Users()
        {
            return new List<User>(){
                new User() {
                    Id = "U001",
                    Name = "A",
                    Occupation = "Engineer",
                    Age = "20"
                },
                new User() {
                    Id = "U002",
                    Name = "B",
                    Occupation = "Teachar",
                    Age = "31"
                }
            };
        }
    }
}
