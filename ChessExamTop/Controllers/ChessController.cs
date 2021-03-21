using System.Linq;
using System.Threading.Tasks;
using ChessExamTop.Data;
using ChessExamTop.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ChessExamTop.Controllers
{
    [Authorize]
    public class ChessController : Controller
    {
        private readonly ApplicationDbContext _context;
        public ChessController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult Index()
        {
            var chessGames = _context.ChessGames.ToList();
            return View(chessGames);
        }
        [HttpGet]
        public IActionResult ChessGame()
        {
            return View();
        }
        [HttpGet]
        public IActionResult CreateGame()
        {
            return View();
        }

        [HttpPost]
        public IActionResult CreateGame(string name)
        {
            if (name != "" && name != null)
            {
                var chessGame = new ChessGame
                {
                    Name = name,
                    User1 = HttpContext.User.Identity.Name
                };
                _context.ChessGames.Add(chessGame);
                _context.SaveChanges();
                return RedirectToAction("Index");
            }
            else
            {
                return View();
            }

        }
    }
}