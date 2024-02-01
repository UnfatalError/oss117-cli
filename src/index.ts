import { OSS117CLI } from './cli';
import { OSS117ApiService } from './lib/services/oss117-api.service';

const injectedService = new OSS117ApiService();

const oss117CLI = new OSS117CLI(injectedService);

oss117CLI.execute();