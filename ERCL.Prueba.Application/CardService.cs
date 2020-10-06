using ERCL.Prueba.Domain;
using System;

namespace ERCL.Prueba.Application
{
    public class CardService
    {
        public CardService(IGenericRepository<Card> repository)
        {
            Repository = repository;
        }

        public IGenericRepository<Card> Repository { get; }

        public void Create(string name, string pan)
        {
            Repository.Insert(new Card(name, pan));
            Repository.Save();
        }

        public string CsvEncriptedFile()
        {
            throw new NotImplementedException();
        }
    }
}
