using System.Collections.Generic;

namespace ERCL.Prueba.Domain.Interfaces.Helper
{
    public interface IFileProcesor
    {
        string DecryptString(string cipherText);
        string EncryptString(string plainText);
        string GetCsv<T>(IEnumerable<T> items);
    }
}
