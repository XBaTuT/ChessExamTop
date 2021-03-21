using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChessExamTop.Models
{
    public class ChessGame
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public string User1 { get; set; }
        public string User2 { get; set; }

    }
}
