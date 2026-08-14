import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { ConfigurationChecker } from '@gitroom/helpers/configuration/configuration.checker';

@Injectable()
export class ConfigurationTask {
  @Command({
    command: 'config:check',
    describe: 'Verifica se há problemas no arquivo de configuração (.env).',
  })
  create() {
    const checker = new ConfigurationChecker();
    checker.readEnvFromProcess();
    checker.check();

    if (checker.hasIssues()) {
      for (const issue of checker.getIssues()) {
        console.warn('Problema de configuração:', issue);
      }

      console.error(
        'Verificação da configuração concluída. Problemas: ',
        checker.getIssuesCount()
      );
    } else {
      console.log('Verificação da configuração concluída sem problemas.');
    }

    console.log('Pressione Ctrl+C para sair.');
    return true;
  }
}
