using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using Unic.Data;
using Unic.Models;

namespace Unic.Controllers
{
    public class PessoaController : Controller
    {
        private readonly MvcUnicContext _context;

        public PessoaController(MvcUnicContext context)
        {
            _context = context;
        }

        // GET: Pessoa
        public async Task<IActionResult> Index()
        {
            return View();
        }
         public async Task<IActionResult> ListarPessoas()
        {
            var pessoas = await _context.Pessoa.ToListAsync();
            var listaPessoas = pessoas.ToList();
            return Json(listaPessoas);
        }

        // GET: Pessoa/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var pessoa = await _context.Pessoa
                .FirstOrDefaultAsync(m => m.Id == id);
            if (pessoa == null)
            {
                return NotFound();
            }

            return View(pessoa);
        }


        [HttpPost]
        public async Task<IActionResult> SalvarPessoa([FromBody] Pessoa pessoa)
        {
            try
            {
                if(ModelState.IsValid){
                    pessoa.DataCriacao = DateTime.Now;
                    _context.Add(pessoa);
                    await _context.SaveChangesAsync();
                    return Json("Sucesso");
               }else{
                    return Json("error");
               }
            }
            catch(Exception e)
            {
                return Json(e.Message);
            }

            return View();
        }

        // GET: Pessoa/Edit/5
        public async Task<IActionResult> SelecionarPessoa(int? id)
        {
            try { 
                if(id == null) return NotFound();
                var pessoa = await _context.Pessoa.FindAsync(id);
                if (pessoa == null) return NotFound();
                return Json(pessoa);
            }
            catch(Exception e)
            {
                return Json(e.Message);
            }
        }


        [HttpPost]
        public async Task<IActionResult> Edit([FromBody] Pessoa p)
        {
            var pessoa = new Pessoa();
            try 
            { 
                if (ModelState.IsValid)
                {
                    pessoa = await _context.Pessoa.FindAsync(p.Id);
                    pessoa.Id = p.Id;
                    pessoa.Nome = p.Nome;
                    pessoa.Nascimento = p.Nascimento;
                    pessoa.Cpf = p.Cpf;
                    pessoa.Email = p.Email;
                    _context.Update(pessoa);

                    await _context.SaveChangesAsync();
                }
            }
            catch(Exception e)
            {
                return Json(e.Message);
            }
            return Json(pessoa);
        }
        
        [HttpPost]
        public async Task DeleteConfirmed(int id)
        {
            var pessoa = await _context.Pessoa.FindAsync(id);
            _context.Pessoa.Remove(pessoa);
            await _context.SaveChangesAsync();
            
        }

        private bool PessoaExists(int id)
        {
            return _context.Pessoa.Any(e => e.Id == id);
        }
    }
}
