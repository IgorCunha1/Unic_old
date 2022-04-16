using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Unic.Models;

namespace Unic.Data
{
    public class MvcUnicContext : DbContext
    {
        public MvcUnicContext (DbContextOptions<MvcUnicContext> options): base(options)
        {

        }

        public DbSet<Produto> Produto { get; set; }

        public DbSet<Pessoa> Pessoa { get; set; }
    }
}
